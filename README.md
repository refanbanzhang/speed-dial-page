###设置拓展图标
chrome.browserAction.setIcon(details, callback)
details的类型为对象，可以包含三个属性，分别是imageData、path和tabId
chrome.browserAction.setIcon({path: 'img/' + ( status ? 'online.png' : 'offline.png')});


 * chrome.runtime.onMessage.addListener(callback)
 * callback 必选参数，回调函数
 * callback 接收到的参数有三个
 * message sender sendResponse
 * sender对象包含4个属性
 * 分别是tab、id、url和tlsChannelId
 * tab是发起消息的标签

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    sendResponse('Hello from background.');
});


 * chrome.runtime.sendMessage(extensionId, message, options, callback)
 * 发送消息
 * extensionId  所发送消息的目标扩展 如果不指定这个值，则默认本身
 * message      为要发送的内容，类型随意
 * options      是否要将TLS通道ID发送
 * callback     是回调函数
 
chrome.runtime.sendMessage('Hello', function(response){
    $('body').append(response);
});

### chrome.storage的API
get:
    chrome.storage.StorageArea.get(keys, function(result){
        console.log(result);
    });

set:
    chrome.storage.StorageArea.set(items, function(){
        //do something
    });

getBytesInUse:
    chrome.storage.StorageArea.getBytesInUse(keys, function(bytes){
        console.log(bytes);
    });

remove:
    chrome.storage.StorageArea.remove(keys, function(){
        //do something
    });

clear:
    chrome.storage.StorageArea.clear(function(){
        //do something
    });

### onChanged事件
    当存储区的数据发生改变时，这个事件会被激发。
    callback会接收到两个参数，第一个为changes，第二个是StorageArea
    changes是词典对象，键为更改的属性名称，值包含两个属性，分别为oldValue和newValue；
    StorageArea为local或sync。
    chrome.storage.onChanged.addListener(function(changes, StorageArea){
        console.log('Value in '+areaName+' has been changed:');
        console.log(changes);
    });
