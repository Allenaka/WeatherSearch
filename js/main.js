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
        ip: 'http://ip.ws.126.net/ipquery?ie=utf-8'
    },
    shim : {
        bootstrap: ['jquery']
    }
});
require(['vue','mycity', 'map', 'Data', 'axios', 'jquery', 'bootstrap'], function(Vue, mycity, loadMap, Data) {
    //加载地图
    loadMap();
    
});
