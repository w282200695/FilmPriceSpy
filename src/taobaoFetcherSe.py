# -*- coding: utf-8 -*-
from FetcherBase import FetcherBase
from time import clock,sleep
from selenium import webdriver
import json

class taobaoFetcherSe(FetcherBase):
    __driver = webdriver.PhantomJS(executable_path='phantomjs.exe',service_args=['--load-images=false'])
    __elementReference = []
    __showsList = {}
    url = 'http://h5.m.taobao.com/app/movie/pages/index/show-list.html?cinemaid='
    def __init__(self):
        FetcherBase.__init__(self)
        self.platformId = 1

    def __init__(self,cinameList):
        FetcherBase.__init__(self)
        self.cinemasList = cinameList
        self.platformId = 1

    def __del__(self):
        self.__driver.quit()

    #对外接口 执行后self.data和self.cinemaList对应结果
    def run(self):
        for cinemaID in self.cinemasList:   #每一个电影院进行遍历获取数据
            print '#%f#'%clock()
            self.__connectCinemaUrl(cinemaID)
            print '##%f##'%clock()
            self.__getShowsList(cinemaID)
            print '###%f###'%clock()
            self.data.append(self.__getCinemaDetailData(cinemaID))
            print '####%f####'%clock()
    
    #获取该电影院的影片ID列表
    def __getShowsList(self,cinemaID):      
        self.__elementReference = self.__driver.find_element_by_class_name('scroll-layer').find_elements_by_tag_name('li')
        tmp = []
        for filmElement in self.__elementReference:     #把各部影片的name和id存放到showsList中
            tmp.append({'showname':filmElement.get_attribute('data-name'),'showid':filmElement.get_attribute('data-showid')})
        self.__showsList[cinemaID] = tmp

    #获取该电影院的详细数据(影片信息和票务信息)
    def __getCinemaDetailData(self,cinemaID):
        detailDataList = []
        for i in range(len(self.__elementReference)):
            detailDataList.append({'showInfo':self.__showsList[cinemaID][i],'ticketDetail':self.__getFilmDetailData(i)})
        return  detailDataList

    #访问电影院对应的页面
    def __connectCinemaUrl(self,cinemaID):
        cinemaUrl = self.url + cinemaID
        self.__driver.get(cinemaUrl)
        sleep(0.8)

    #获取某部电影的详细数据(可购票时间及场次)
    def __getFilmDetailData(self,i):
        self.__elementReference[i].click()
        sleep(0.8)

        elementsList = self.__driver.find_elements_by_class_name('xslide-item')
        dateList = []
        for element in elementsList:    #获取预售日期列表
            tmp = element.find_element_by_tag_name('a')
            dateList.append(tmp.text)
            tmp.click()
        #elementsList[1].click()
        #self.__driver.get_screenshot_as_file('D:/kk%d.png'%i)
        elementsList = self.__driver.find_elements_by_class_name('schedules-item-wrap')
        filmDetailDataList = []
        for i in range(len(elementsList)):  #获取{'dateinfo':日期信息,'dateDetailinfo':该日可购票场次和票价信息}
            filmDetailDataList.append({'dateinfo':dateList[i],'dateDetailinfo':self.__getDateDetailData(elementsList[i])})
        return filmDetailDataList

    #获取某日的详细票价信息
    def __getDateDetailData(self,elementRef):
        actsList = []
        elements = elementRef.find_elements_by_class_name('itme-wrap')
        for i in elements:  #提取每场次的数据{'clock':时间(开场时间),'type':种类(3D/2D/IMAX),'price':票价(最优惠)}
            actsList.append({'clock':i.find_element_by_class_name('item-clock').text,'type':i.find_element_by_class_name('item-type').text,'price':i.find_element_by_class_name('item-price').text})
        return actsList

    def toJSON(self):
        l = {}
        l['cinemalist'] = self.cinemasList
        l['datalist'] = self.data
        return json.dumps(l,ensure_ascii=False)