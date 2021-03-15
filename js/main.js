require.config({
    // baseUrl : './',
    paths : {
        jquery: './jquery-3.4.1.min',
        bootstrap: './bootstrap',
        vue: './vue',
        axios: './axios.min',
        echarts: './echarts.min',
        china: './china',
        Data: './Data',
        mycity: './mycity',
        lifeIndex: './lifeIndex'
    },
    shim : {
        bootstrap: ['jquery']
    }
});
require(['map', 'rank', 'rain', 'mycity', 'lifeIndex'], function(loadMap, loadRank, loadRain) {  
    //加载地图
    loadMap();   
    //加载排行
    loadRank();
    //加载降水图
    loadRain();
});
