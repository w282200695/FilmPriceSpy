from FetcherBase import FetcherBase
import os
import json

class maizuoFetcher(FetcherBase):
    def __init__(self):
        FetcherBase.__init__(self)
        self.platformId = 2

    def __init__(self,cinema):
        FetcherBase.__init__(self)
        self.platformId = 2
        self.cinemasList = cinema

    def run(self):
        self.getCinemaData()
        return 0

    def getCinemaData(self):
        cinCommand = 'phantomjs.exe --ignore-ssl-errors=true C:/Users/imwos/Desktop/phantomjs-2.1.1-windows/bin/maizuo.js '
        for i in self.cinemasList:
            #print cinCommand + i
            self.data.append([i,json.load(os.popen(cinCommand + i))])