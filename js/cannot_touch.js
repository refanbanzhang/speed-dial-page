window.onload = function(){
    var searchElem = document.getElementById('s_btn_wr');

    searchElem.addEventListener('click', function(event){
        event.preventDefault();
        var width  = window.innerWidth;
        var height = window.innerHeight;
        
        var left   = Math.random() * width - 200;
        var top    = Math.random() * height - 100;

        // searchElem.setAttribute('style', 'position: fixed; left: ' + left + 'px; top: ' + top + 'px');
        
    }, false);
}