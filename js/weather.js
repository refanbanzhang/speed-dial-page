$(function(){
    function httpRequest(url, callback){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                callback(xhr.responseText);
            }
        };

        xhr.send();
    }

    const CITYKEY = "city";
    var city = localStorage.getItem(CITYKEY) || '深圳';
    var url  = 'http://v.juhe.cn/weather/index?cityname=' + encodeURIComponent(city) + '&dtype=&format=&key=7d0bdaa5f0c93c8216599590e37892bb';


    function formatResult(result){
        result = JSON.parse(result);
        var str = `<table><tr>
                        <th>日期</th>
                        <th>温度</th>
                        <th>天气</th>
                        <th>风量</th>
                    </tr>`;

        $.each(result.result.future, function(index, val) {
            str += `<tr>
                        <td>`+ val.week +`</td>
                        <td>`+ val.temperature +`</td>
                        <td>`+ val.weather +`</td>
                        <td>`+ val.wind +`</td>
                    </tr>`;
        });
               
        str += '</table>';

        $('body').append(str);
    }

    // httpRequest(url, formatResult);

});


