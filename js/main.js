require.config({
    // baseUrl : './',
    paths : {
        jquery: './jquery-3.4.1.min',
        bootstrap: './bootstrap',
        vue: './vue',
        axios: './axios.min',
        echarts: './echarts.min',
        china: './china'
    },
    shim : {
        bootstrap: ['jquery']
    }
});
require(['vue','mycity', 'map', 'axios', 'jquery', 'bootstrap'], function(Vue, mycity, loadMap) {
    //加载地图
    loadMap();
});
