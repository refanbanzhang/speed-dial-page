var Storage = (function(){

    var
        store,
        indexedDB,
        initDB,
        initPage
        ;

    indexedDB = window.indexedDB || window.msindexedDB || window.mozIndexedDB ||
                window.mozIndexedDB || window.webkitIndexedDB;

    initDB = function(callback){
        if(!indexedDB){return;}

        var request = indexedDB.open('book');

        request.onerror = function(event){  
            console.log('Something bad happened while trying to open: ' +
                request.errorCode);
        };

        request.onsuccess = function(event){
            var database = store = request.result;

            if(database.version !== 1.0){
                var _request = database.setVersion("1.0");
                _request.onerror = function(){
                    console.log('Something bad happened while trying to set version: ' +
                        _request.errorCode);
                };
                _request.onsuccess = function(){
                    console.log('Datebase initializetion . Database name: ' + database.name + 
                        ', Version: ' + database.version);
                };
            }else{
                // console.log('Database already initialized. Database name: ' +
                //     database.name + ', Version: ' + database.version);
            }
            initPage();
        };

        request.onupgradeneeded = function(){
            var db = request.result;
            var objectStore = db.createObjectStore('items', {
                keyPath: 'id'
            });

            objectStore.createIndex('address', 'url', {unique: false});
        };

    };

    initPage = function(){
        var tx          = store.transaction(['items'], 'readonly');
        var objectStore = tx.objectStore('items');
        var cursor      = objectStore.openCursor();

        cursor.onsuccess = function(event){
            var result = event.target.result;
            if(result === null){
                onfire.fire('initComplete', {state: 'complete'});
                return;
            }

            onfire.fire('initPage', result.value);

            result.continue();
        };
    };

    showItem = function(item){
        console.log(item);
    };

    insertItem = function(item){
        var tx          = store.transaction(['items'], 'readwrite');
        var objectStore = tx.objectStore('items');
        var request     = objectStore.add(item);
        tx.oncomplete = function(){
            console.log('insertItem complete');
        };
    };

    removeItem = function(id){
        if(!indexedDB){return;}

        var tx          = store.transaction(['items'], 'readwrite');
        var objectStore = tx.objectStore('items');
        var request     = objectStore['delete'](id);
        tx.oncomplete = function(){
            console.log('removeItem complete');
        };
    };

    dropDatabase = function(){
        if(!indexedDB){return;}

        var delDBRequest = indexedDB.deleteDatabase('items');
        delDBRequest.onsuccess = function(){
            console.log('destory database complete');
        };
    };

    updateItem = function(item){
        if(!indexedDB){return;}

        var tx          = store.transaction(['items'], 'readwrite');
        var objectStore = tx.objectStore('items');
        var request     = objectStore.put(item);
    };

    initDB();

    return {
        insertItem: insertItem,
        removeItem: removeItem,
        dropDatabase: dropDatabase,
        updateItem: updateItem
    };
})();



