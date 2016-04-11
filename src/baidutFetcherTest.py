# -*- coding: utf-8 -*-
from baiduFetcher import *
import sys 
from time import clock
reload(sys) 
sys.setdefaultencoding('utf8')
print clock()
test = baiduFetcher(['8583'])
test.run()
print clock()
fpp = open('D:/baiduResult.txt','w+')
res = json.dump({'baidu':test.data},fpp,ensure_ascii=False)
print clock()
fpp.close()
