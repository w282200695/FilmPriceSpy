#FilmPriceSpy

>   Fetch the price information from some Ticketing Applications

The project is to compare the fares in each ticketing application and  help select the most favorable way to buy movie tickets.

##Requirement

Python == 2.7.x

seleniu[(Offical Site)](http://docs.seleniumhq.org/)

phantomjs [(Offical Site)][http://phantomjs.org/]

##Usage

import the module in 'src' floder.

<pre>from taobaoFetcherSe import taobaoFetcherSe</pre>

or

<pre>from taobaoFetcher import taobaoFetcher</pre>

##Module

#####taobaoFetcher

>   Fetch the information from Taobao film mobile website

this class will callback the phanthomJS.exe with os.popen()

#####taobaoFetcherSe

>   Fetch the information from Taobao film mobile website with seleniu module.

this class visit the website with seleniu.webdriver.PhantomJS()

#####baiduFetcher

>   Fetch the information from Baidu Nuomi film mobile website

this class will callback the phanthomJS.exe with os.popen()

#####maizuoFetcher

>   Fetch the information from Maizuo film mobile website

this class will callback the phanthomJS.exe with os.popen()

##TODO

>   APP list
>
>   >   ~~淘宝电影~~
>   >
>   >   ~~百度糯米~~
>   >
>   >   美团电影
>   >
>   >   猫眼电影
>   >
>   >   ~~卖座电影~~
>   >
>   >   格瓦拉电影
