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
require(['vue','mycity', 'lifeIndex', 'map', 'Data', 'axios', 'jquery', 'bootstrap'], function(Vue, mycity, life, loadMap, Data) {
    //加载地图
    loadMap();   
});
