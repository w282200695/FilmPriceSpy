var webpage = require('webpage')
  , page = webpage.create(),system = require('system');
page.settings = {
    javascriptEnabled: true,
    loadImages: false,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) PhantomJS/19.0'
};
cinemaid = system.args[1];
targetUrl = 'http://h5.m.taobao.com/app/movie/pages/index/show-list.html?cinemaid=' + cinemaid;
page.open(targetUrl, function (status) {
    var data;
    if (status === 'fail') {
        console.log('[]');
        phantom.exit();
    } else {
        setTimeout(function () {
            var text = page.evaluate(function () {
                filmList = document.getElementsByClassName('scroll-layer')[0].firstChild.children;
                var list = new Array();
                function filminfo(name, id) {
                    this.name = name;
                    this.id = id;
                }
                for (var i = 0 ; i < filmList.length; i++) {
                    list.push(new filminfo(filmList[i].getAttribute('data-name'), filmList[i].getAttribute('data-showid')));
                }
                return JSON.stringify(list);
            })
            console.log(text);
            phantom.exit();
        }, 500)
    }
    // release the memory

});
