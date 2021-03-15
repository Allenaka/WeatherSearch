define([
    'Data'
], function(WeatherData) {
    function loadRain() {
        var pic;
        if (pic = WeatherData.getCacheData('rain_img')) {
            var img = document.getElementById('rain').children[0];
            img.src = pic;
        }
        else {
            WeatherData.getRainImage(function(pic) {
                var img = document.getElementById('rain').children[0];
                img.src = pic;
                WeatherData.setCacheData('rain_img', pic, 1800000);
            });   
        }
        
    }
    return loadRain;
});