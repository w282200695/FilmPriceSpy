var webpage = require('webpage');
var page = webpage.create();
var system = require('system');
cinemaid = system.args[1];
page.settings = {
    javascriptEnabled: true,
    loadImages: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0',
    resourceTimeout: 600
};
page.onError = function(msg, trace) {
}
url = 'http://m.maizuo.com/v4/?co=maizuo#!/cinema/'+cinemaid+'/film'; //1827
page.open(url,function(status){
    if(status === 'fail'){
        console.log('[]');
        phantom.exit();
    }else {
        setTimeout(function(){
            var text = page.evaluate(function(){
                var rr = new Array();
                function dateDetail(clock, ftype, price,tips) {
                    this.clock = clock;
                    this.ftype = ftype;
                    this.price = price;
                    this.tips = tips;
                }
                function saleDetail(dateinfo, dateDetailinfo) {
                    this.dateinfo = dateinfo;
                    this.dateDetailinfo = dateDetailinfo;
                }
                function getNameAndDetail(){
                    var dateList = document.getElementsByClassName('schedule-date-item');
                    var resultList = new Array();
                    for (var i = 0; i < dateList.length; i++) {
                        dateList[i].click();
                        var dateDetailList = new Array();
                        var dateilElementList = document.getElementsByClassName('schedule-detail-wrap');
                        for (var j = 0; j < dateilElementList.length; j++) {
                            var tmpElement = dateilElementList[j];
                            dateDetailList.push(new dateDetail(tmpElement.getElementsByClassName('schedule-detail-showtime')[0].innerText,tmpElement.getElementsByClassName('schedule-detail-des')[0].innerText,tmpElement.getElementsByClassName('schedule-detail-price')[0].innerText,tmpElement.getElementsByClassName('label-tips')[0].textContent));
                        }
                        resultList.push(new saleDetail(dateList[i].innerText,dateDetailList));
                    }
                    return resultList;
                }
                ClickList = document.getElementsByClassName('filmItem');
                filmNameList = document.getElementsByClassName('film-list-film-name');
                for (var g = 0; g < ClickList.length; g++) {
                    ClickList[g].click();
                    rr.push(filmNameList[g].innerText);
                    rr.push(getNameAndDetail());
                }
                return JSON.stringify(rr);
            });
            console.log(text);
            phantom.exit();
        },500)
    }
});
