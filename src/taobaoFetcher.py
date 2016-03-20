from FetcherBase import FetcherBase
import os
import json
class taobaoFetcher(FetcherBase):
    showsList = {}
    def __init__(self):
        FetcherBase.__init__(self)
        self.platformId = 1

    def __init__(self,cinemaList):
        FetcherBase.__init__(self)
        self.cinemasList = cinemaList
        self.platformId = 1

    def run(self):
        for i in self.cinemasList:
            singledata = self.getSingleCinemaData(i)
            self.data.append([i,singledata])
        return 0

    def getShowsList(self):
        cinCommand = '../phantomjs/bin/phantomjs.exe ../phantomjs/taobaoJS/getTBFilmInfo.js '
        for i in self.cinemasList:
            self.showsList[i] = json.load(os.popen(cinCommand + i))
            #self.showsList.append(json.load(os.popen(cinCommand + i)));

    def getSingleCinemaData(self,ciname):
        dataCommand = '../phantomjs/bin/phantomjs.exe ../phantomjs/taobaoJS/phantomjs-2.1.1-windows/bin/getdetail.js '
        tmp = []
        for i in self.showsList[ciname]:
            singledata = json.load(os.popen(dataCommand + ciname + ' ' + i['id']))
            tmp.append([i['name'],singledata])
        return tmp