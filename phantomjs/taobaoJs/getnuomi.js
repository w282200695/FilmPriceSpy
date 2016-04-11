var webpage = require('webpage');
var page = webpage.create();
var system = require('system');
cinemaid = system.args[1];
page.settings = {
    javascriptEnabled: true,
    loadImages: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
};
url = 'http://m.dianying.baidu.com/info/cinema/detail?cinemaId='+cinemaid;
page.open(url,function(status){
    if(status === 'fail'){
        console.log('[]');
        phantom.exit();
    }else {
        setTimeout(function(){
            var text = page.evaluate(function(){
                var rr = new Array();
                function dateDetail(clock, ftype, price) {
                    this.clock = clock;
                    this.ftype = ftype;
                    this.price = price;
                }
                function saleDetail(dateinfo, dateDetailinfo) {
                    this.dateinfo = dateinfo;
                    this.dateDetailinfo = dateDetailinfo;
                }
                function getNameAndDetail(){
                    var dateList = document.getElementsByClassName('date-item');
                    var resultList = new Array();
                    for (var i = 0; i < dateList.length; i++) {
                        dateList[i].click();
                        var dateDetailList = new Array();
                        var dateilElementList = document.getElementsByClassName('animation');
                        for (var j = 0; j < dateilElementList.length; j++) {
                            var tmpElement = dateilElementList[j];
                            dateDetailList.push(new dateDetail(tmpElement.getElementsByClassName('start')[0].textContent,tmpElement.getElementsByClassName('lan')[0].textContent,tmpElement.getElementsByClassName('low-price')[0].innerText));
                        }
                        resultList.push(new saleDetail(dateList[i].innerText,dateDetailList))
                    }
                    return resultList;
                }
                ClickList = document.getElementById('cover-wrapper').firstElementChild.children;
                rr.push(document.getElementsByClassName('movie-title')[0].innerText);
                rr.push(getNameAndDetail());
                for (var g = 1; g < ClickList.length; g++) {
                    ClickList[g].click();
                    rr.push(document.getElementsByClassName('movie-title')[0].innerText);
                    rr.push(getNameAndDetail());
                }
                return JSON.stringify(rr);
            });
            console.log(text);
            phantom.exit();
        },500)
    }
});
