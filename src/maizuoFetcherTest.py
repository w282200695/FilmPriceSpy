# -*- coding: utf-8 -*-
from maizuoFetcher import *
import sys 
from time import clock
reload(sys) 
sys.setdefaultencoding('utf8')
print clock()
test = maizuoFetcher(['1827'])
test.run()
print clock()
fpp = open('D:/maizuoResult.txt','w+')
res = json.dump({'maizuo':test.data},fpp,ensure_ascii=False)
print clock()
fpp.close()
