define([
    'vue',
    'Data',
    'axios'
], function(Vue, WeatherData, axios) {
    var mycity = new Vue({
        el: '#mycity',
        data: {
            //从缓存获取定位城市
            city: localStorage.getItem("ipcity"),
            weaList: [],
            week: "--",
            tem: "--",
            date: "--",
            airLevel : "--"
        },
        methods: {
            /**
             * 存储数据
             * @param {Array} data 
             */
            setData: function (data){
                this.weaList = data;
                this.week = data[0].week.replace("星期", "周");
                this.tem = data[0].tem;  
                this.date = data[0].date;
                this.airLevel = data[0].air_level;
            },
            /**
             * 获取天气数据
             */
            getWeatherData: function() {
                var that = this;
                var data;
                //获取缓存
                if (data = WeatherData.getCacheData(that.city)) {
                    //设置数据              
                    this.setData(data);
                }
                //无缓存重新获取
                else {
                    //创建WeatherData实例对象
                    var ipCityData = new WeatherData();
                    //获取数据
                    ipCityData.getData(function() {
                        data = ipCityData.data;
                        that.city = ipCityData.city;
                        that.setData(data);
                        //缓存数据
                        localStorage.setItem("ipcity", that.city);
                        WeatherData.setCacheData(that.city, data);                  
                    });        
                }
            }
        }
    });
    //获取数据
    mycity.getWeatherData();
});
