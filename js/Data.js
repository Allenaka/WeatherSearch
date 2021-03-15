define([
    'axios'
], function(axios) {
    /**
     * 
     * @param {Stirng} city 地区
     */
    function WeatherData(city = "") {
        this.city = city;
    }
    /**
     * 缓存数据
     * @param {String} key 缓存名
     * @param {Array/Object/String/Number} value 缓存内容
     * @param {Number} expire 缓存过期时间
     */
    WeatherData.setCacheData = function(key, value, expire = 0) {
        //当前时间戳
        var nowTime = Date.now();
        //缓存数据
        localStorage.setItem(key, JSON.stringify(value));
        //缓存过期时间，永久为0
        if (expire > 0) {
            localStorage.setItem(key + '_expire', nowTime + expire);
        }
        else {
            localStorage.setItem(key + '_expire', 0);
        }     
    }
    /**
     * 获取缓存数据
     * @param {String} key 缓存名
     * @returns 
     */
    WeatherData.getCacheData = function(key) {
        //当前时间戳
        var nowTime = Date.now();
        var hour = new Date().getHours();
        //过期时间
        var cacheDataExpire = parseInt(localStorage.getItem(key + '_expire'));
        //判断缓存失效
        if (cacheDataExpire === null || cacheDataExpire > 0 && cacheDataExpire < nowTime) {
            //删除该缓存
            localStorage.removeItem(key)
            // 删除过期时间
            localStorage.removeItem(key + '_expire')
            return false;
        }
        //缓存有效，返回缓存内容
        return JSON.parse(localStorage.getItem(key));
    }
    WeatherData.getRainImage = function(callback) {
        var url = "https://tianqiapi.com/api?version=v8&appid=85593735&appsecret=ddofpk21";
        axios.get(url)
        .then(function(response) {
            //存储
            var pic = response.data.data[1 ].pic;
            console.log(pic)
            //回调
            callback(pic);
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    /**
     * 请求数据
     * @param {function} callback 
     */
     WeatherData.prototype.getData = function(callback) {
        var that = this;
        // this.city = city;
        //请求指定地区数据
        var url = "http://www.tianqiapi.com/api?version=v1&appid=85593735&appsecret=ddofpk21&city=" + this.city;
        // var url = "https://v0.yiketianqi.com/api?version=v9&appid=85593735&appsecret=ddofpk21&city=" + this.city;
        //请求定位地区数据
        if (this.city === "") {
            url = "http://www.tianqiapi.com/api?version=v1&appid=85593735&appsecret=ddofpk21";
            // url = "https://v0.yiketianqi.com/api?version=v9&appid=85593735&appsecret=ddofpk21";
        }
        //发起异步请求
        axios.get(url)
        .then(function(response) {
            
            //存储
            that.city = response.data.city;
            that.data = response.data.data;
            //回调
            callback();
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    WeatherData.prototype.getLifeIndex = function(callback) {
        var that = this;
        var url = "https://www.tianqiapi.com/life/life?appid=85593735&appsecret=ddofpk21";
        axios.get(url)
        .then(function(response) {
            //存储
            that.city = response.data.city;
            that.lifeIndex = response.data.zhishu;
            //回调
            callback();
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    return WeatherData;
});