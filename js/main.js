require.config({
    // baseUrl : './',
    paths : {
        jquery: './jquery-3.4.1.min',
        bootstrap: './bootstrap',
        vue: './vue'
    },
    shim : {
        bootstrap: ['jquery']
    }
});
require(['vue','jquery', 'bootstrap', 'mycity'], function(Vue) {
    
    console.log(Vue);
});
