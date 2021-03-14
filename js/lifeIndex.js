define([
    'vue',
    'Data'
], function(Vue, WeatherData) {
    var lifeIndex = new Vue({
        el: '#lifeIndex',
        data: {
            city: '--',
            lifeIndexList: {
                chuanyi: {
                    level: "--",
                    tips: "--"
                },
                daisan: {
                    level: "--",
                    tips: "--"
                },
                ganmao: {
                    level: "--",
                    tips: "--"
                },
                chenlian: {
                    level: "--",
                    tips: "--"
                },
                ziwaixian: {
                    level: "--",
                    tips: "--"
                },
                liangshai: {
                    level: "--",
                    tips: "--"
                },
                xiche: {
                    level: "--",
                    tips: "--"
                },
                diaoyu: {
                    level: "--",
                    tips: "--"
                }
            },
        },
        methods: {
            setData: function(data) {
                for (key in this.lifeIndexList) {
                    this.lifeIndexList[key].level = data[key].level;
                    this.lifeIndexList[key].tips = data[key].tips;
                }
            },
            getLifeData: function() {
                var that = this;
                var data;
                if (data = WeatherData.getCacheData('ipcity_life')) {
                    //设置数据              
                    this.setData(data);
                }
                else {
                    //创建WeatherData实例对象
                    var ipCityLife = new WeatherData();
                    //获取数据
                    ipCityLife.getLifeIndex(function() {
                        data = ipCityLife.lifeIndex;
                        for (key in that.lifeIndexList) {
                            console.log(data[key].level);
                            that.lifeIndexList[key].level = data[key].level;
                            that.lifeIndexList[key].tips = data[key].tips;
                        }
                        WeatherData.setCacheData("ipcity_life", that.lifeIndexList)
                    }); 
                }
            }
        }
    });
    lifeIndex.getLifeData();
});