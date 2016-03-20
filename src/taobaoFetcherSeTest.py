from taobaoFetcherSe import taobaoFetcherSe
import sys 
import time
reload(sys) 
sys.setdefaultencoding('utf8')
print time.clock()
testSample = taobaoFetcherSe(['29752'])
print time.clock()
testSample.run()
print time.clock()
jsoo = testSample.toJSON()
print time.clock()
fp = open('D:/re.txt','w+')
fp.write(jsoo)
fp.close()
