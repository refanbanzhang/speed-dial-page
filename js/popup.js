$(function(){

    /**
     * 点击添加按钮，获取当前页面的地址 标题 缩略图
     * 然后将其加入localStorage中
     */
    const BOOKMARKKEY = 'bookmark';

    function saveCurrentPageInfo(){
        var book = {};
        chrome.tabs.query({currentWindow: true, active: true}, function(tab){
            book = {
                id: new Date().getTime(),
                title: tab[0].title,
                url: tab[0].url,
                photo: ''
            };

            Storage.insertItem(book);
            setTimeout(function(){
                makePhoto(book);
            }, 0);
        });
    }

    function makePhoto(book){
        chrome.tabs.captureVisibleTab(null,
            {format: 'png'},
            function (src) {
                book.photo = src;
                //  调用Storage.updateItem将图像更新进去
                Storage.updateItem(book);
            }
        ); 
             
    }


    $('#newBookMark').click(function(event){
        saveCurrentPageInfo();
        // self.close();
    });

    $('#options').on("click", function() {
        chrome.tabs.create({
            url: chrome.extension.getURL("options.html"),
            selected: true
        })
    });

    /**
     * chrome.runtime.sendMessage(extensionId, message, options, callback)
     * 发送消息
     * extensionId  所发送消息的目标扩展 如果不指定这个值，则默认本身
     * message      为要发送的内容，类型随意
     * options      是否要将TLS通道ID发送
     * callback     是回调函数
     */
    chrome.runtime.sendMessage('Hello', function(response){
        $('body').append(response);
    });


});