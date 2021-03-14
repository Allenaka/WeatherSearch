define([], function() {
    function Utile() {}
    Utile.getWeatherImage = function(type) {
        // if (arr instanceof Array) {
        //     var weatherImgList = [];
        //     var imgSrc = "";
        //     for (var i = 0; i < arr.length; i++) {
        //         imgSrc = getWeatherImage(arr[i]);
        //         weatherImgList.push(imgSrc);
        //     }
        //     return weatherImgList;
        // }
        // else {
        //     var imgSrc = getWeatherImage(arr);
        //     return imgSrc;
        // }
        var imgSrc = "./img/";
        switch (type) {
            case 'qing':
                imgSrc += "qing.png";
                break;
            case 'yun': 
                imgSrc += "duoyun.png";
                break;
            case 'yin':
                imgSrc += "yins.png";
                break;
            case 'yu':
                imgSrc += "xiaoyu.png";
                break;
            case 'lei':
                imgSrc += "leiyu.png";
                break;
            case 'xue':
                imgSrc += "xiaoxue.png";
                break;
            case 'wu':
                imgSrc += "wu.png";
                break;
            default:
                imgSrc += "qing.png";
                break;
        }
        return imgSrc;
    }
    return Utile;
});