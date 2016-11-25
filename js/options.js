$(function(){
    const CITYKEY = "city";

    var city = localStorage.getItem(CITYKEY) || 'shenzhen';
    $('#city').val(city);

    $('#save').click(function(event) {
        var inputVal = $('#city').val();

        localStorage.setItem(CITYKEY, inputVal);
    });





});