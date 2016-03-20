# -*- coding: utf-8 -*-
from taobaoFetcher import *
import sys 
reload(sys) 
sys.setdefaultencoding('utf8')
test = taobaoFetcher(['29752'])
test.getShowsList()
test.run()
fpp = open('D:/result.txt','w+')
res = json.dump({'taobao':test.data},fpp,ensure_ascii=False)
print res;
fpp.close()
