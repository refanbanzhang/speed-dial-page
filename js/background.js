window.onload = function(){
    function https(url, callback){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                callback(true);
            }
        };

        xhr.onerror = function(){
            callback(false);
        };

        xhr.send();
    }

    function requestSiteIsOnline(){
        https("https://www.baidu.com/", function(status){
            chrome.browserAction.setIcon({path: 'img/' + ( status ? 'online.png' : 'offline.png')});
            setTimeout(requestSiteIsOnline, 1000); 
        });
    }

    // requestSiteIsOnline();


    /**
     * chrome.runtime.onMessage.addListener(callback)
     * callback 必选参数，回调函数
     * callback 接收到的参数有三个
     * message sender sendResponse
     * sender对象包含4个属性
     * 分别是tab、id、url和tlsChannelId
     * tab是发起消息的标签
     */
    // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    //     sendResponse('Hello from background.');
    // });

    //  旋转图标
    function changeIcon(index){
        index = (index || 0)  % 20;

        chrome.browserAction.setIcon({
            path: {"19": 'images/icon19_' + index + '.png'}
        });

        // chrome.browserAction.setIcon({
        //     path: {"38": 'images/icon38_' + index + '.png'}
        // });


        setTimeout(function(){
            changeIcon(index + 1);
        }, 50);
    }

    // changeIcon();
    


    // chrome.browserAction.setBadgeBackgroundColor({color: '#333'});
    // chrome.browserAction.setBadgeText({text: 'Dog'});

    chrome.notifications.create('notifiId', {
        type: "basic", 
        iconUrl: 'img/icon.png', 
        title: 'Notification Demo', 
        message: 'Merry Christmas' 
    }, function(){
        // alert('成功通知');
    });


    setTimeout(function(){
        chrome.notifications.clear('notifiId', function(){
            // alert('取消通知成功');
        });
    }, 1000);


    // chrome.history.search({
    //     text: '',
    //     startTime: new Date().getTime()-24*3600*1000,
    //     endTime: new Date().getTime()
    // }, function(historyItemArray){
    //     var str = JSON.stringify(historyItemArray);


    //     chrome.notifications.create('notifiId', {
    //         type: "basic", 
    //         iconUrl: 'img/icon.png', 
    //         title: 'Notification Demo', 
    //         message: str 
    //     }, function(){
    //         // alert('成功通知');
    //     });
    // });
    
    const BOOKMARKKEY = 'bookmark';
    var items = [];
    function fetch(){
        var data = JSON.parse(localStorage.getItem(BOOKMARKKEY) || '[]');
        return data;
    }    
    items = fetch();



};

