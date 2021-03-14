define([
    'vue',
    'Data',
    'Utile'
], function(Vue, WeatherData, Utile) {
    var mycity = new Vue({
        el: '#mycity',
        data: {
            //从缓存获取定位城市
            city: localStorage.getItem("ipcity"),
            week: "--",
            tem: "--",
            date: "--",
            airLevel: "--",
            wea: "--",
            weaImgSrc: "./img/qing.png",
            weaList: [],
            weaImgsList: [],
            weekList: [],
            temList: [],
            indexList: {
                气压: '--',
                湿度: '--',
                风力: '--',
                紫外线: '--'
            }
        },
        methods: {
            /**
             * 存储数据
             * @param {Array} data 
             */
            setData: function (data){
                this.week = data[0].week.replace("星期", "周");
                this.tem = data[0].tem;  
                this.date = data[0].date;
                this.airLevel = data[0].air_level;
                this.wea = data[0].wea;
                this.weaImgSrc = Utile.getWeatherImage(data[0].wea_img);
                this.indexList['气压'] = data[0].pressure + 'Pa';
                this.indexList['湿度'] = data[0].humidity;
                this.indexList['风力'] = data[0].win_speed;
                this.indexList['紫外线'] = data[0].index[0].level;
                for (var i = 0; i < 4; i++) {
                    this.weaImgsList.push(Utile.getWeatherImage(data[i].wea_img));
                    this.weaList.push(data[i].wea);
                    this.weekList.push(data[i].week);
                    this.temList.push(data[i].tem1);
                }
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
