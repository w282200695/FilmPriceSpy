var webpage = require('webpage')
  , page = webpage.create(),system = require('system');
page.settings = {
    javascriptEnabled: true,
    loadImages: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
};
cinemaid = system.args[1];
showid = system.args[2];
targetUrl = 'http://h5.m.taobao.com/app/movie/pages/index/show-list.html?cinemaid=' + cinemaid + '&showid=' + showid;
page.open(targetUrl, function (status) {
    var data;
    if (status === 'fail') {
        console.log('[]');
        phantom.exit();
    } else {
        setTimeout(function () {
            var text = page.evaluate(function () {
                date = document.getElementsByClassName('xslide-item');
                datet = new Array();
                for (var i = 0; i < date.length; i++) {
                    datet.push(date[i].firstChild.text);
                }
                detail = document.getElementsByClassName('schedules-item-wrap');
                function dateDetail(clock, ftype, price) {
                    this.clock = clock;
                    this.ftype = ftype;
                    this.price = price;
                }
                function saleDetail(dateinfo, dateDetailinfo) {
                    this.dateinfo = dateinfo;
                    this.dateDetailinfo = dateDetailinfo;
                }
                var list = new Array();
                for (var i = 0; i < detail.length; i++) {
                    ltmp = detail[i].getElementsByClassName('itme-wrap');
                    var dateDetailinfo = new Array();
                    for (var j = 0; j < ltmp.length; j++) {
                        var temp = ltmp[j];
                        dateDetailinfo.push(new dateDetail(temp.getElementsByClassName('item-clock')[0].textContent, temp.getElementsByClassName('item-type')[0].textContent, temp.getElementsByClassName('item-price')[0].textContent));
                    }
                    list.push(new saleDetail(datet[i], dateDetailinfo));
                }
                return JSON.stringify(list);
            }
)
            console.log(text);
            phantom.exit();
        }, 500)
    }
    // release the memory

});
