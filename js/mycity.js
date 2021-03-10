define([
    'vue',
    'axios'
], function(Vue) {
    var mycity = new Vue({
        el: '#mycity',
        data: {
            city: "北京",
            weaList: [],
            weak: "--",
            tem: "--"
        },
        methods: {
            getData: function() {
                var that = this;
                axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
                .then(function(response) {
                    console.log(response);
                    var data = response.data.data;
                    that.weaList = data.forecast;
                    that.weak = data.forecast[0].date.substr(-3, 3).replace("星期", "周");
                    that.tem = data.forecast[0].high.match(/\d+/)[0];
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        }
    });
    //获取数据
    mycity.getData();
});
