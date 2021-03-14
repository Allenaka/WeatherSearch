define([
    'Data',
    'echarts',
    'china'
], function(WeatherData, echarts) {
    var province = ['北京','天津','上海','重庆','河北','河南','云南', '辽宁','黑龙江', '湖南', 
                        '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', 
                        '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏',
                        '四川', '宁夏', '海南', '台湾', '香港', '澳门'];
    var shenghui = ["北京", "天津" , "上海", "重庆", "石家庄", "郑州", "昆明", "沈阳", "哈尔滨", 
                    "长沙", "合肥", "济南", "乌鲁木齐", "苏州", "杭州", "南昌", "武汉", "南宁", 
                    "兰州", "太原", "呼和浩特", "西安", "长春", "福州", "贵阳", "广州", "西宁", 
                    "拉萨", "成都", "银川", "海口", "台北", "香港", "澳门"];
    var data;
    var mapData = [];
    var wendu = {};
    function loadMap() { 
        var chart = echarts.init(document.getElementById('map'));
        var obj = {
            title : {
                text: '全国温度地图',
                left: 'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    left: 'left',
                    data:['温度'],
                },
                visualMap: {
                    min: -20,
                    max: 50,
                    left: 'left',
                    inRange: {
                        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                    },
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    left: 'right',
                    top: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series: [{
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    name: '温度',
                    type: 'map',
                    map: 'china',
                    data: mapData
                }]
        }
        chart.setOption(obj);
    }
    function loadData() {
        //异步任务数量计数
        var n = 0;
        //判断异步队列执行完毕
        var judge = function() {
            if (n === 34) {
                //加载地图
                loadMap();
            }
        };
        for (var i = 0; i < shenghui.length; i++) {
            if (data = WeatherData.getCacheData(shenghui[i])) {
                wendu = {name: province[i], value: data[0].tem.match(/\d+/)[0]};
                mapData.push(wendu);
                n++;
                judge();
            }
            else {
                //闭包
                var outer = (function(i) {
                    
                    return function() {
                        var cityData = new WeatherData(shenghui[i]); 
                        console.log(cityData)
                        cityData.getData(function() {
                            var data = cityData.data;
                            wendu = {name: province[i], value: data[0].tem.match(/\d+/)[0]};
                            mapData.push(wendu);
                            WeatherData.setCacheData(cityData.city, data);
                            n++;
                            judge();
                        });
                    }
                })(i);
                outer();
            }      
        }
    }
    return loadData;
});