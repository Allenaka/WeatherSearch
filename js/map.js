define([
    'echarts',
    'china'
], function(echarts) {
    function loadMap() {
        var chart = echarts.init(document.getElementById('map'));
        chart.setOption({
            title : {
            text: '全国天气地图',
            left: 'center'
            },
            tooltip : {
                trigger: 'item'
            },
            // legend: {
            //     left: 'left',
            //     data:['温度'],
            // },
            // visualMap: {
            //     min: -20,
            //     max: 50,
            //     left: 'left',
            //     inRange: {
            //         color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            //     },
            //     text:['高','低'],           // 文本，默认为数值文本
            //     calculable : true
            // },
            // toolbox: {
            //     show: true,
            //     orient : 'vertical',
            //     left: 'right',
            //     top: 'center',
            //     feature : {
            //         mark : {show: true},
            //         dataView : {show: true, readOnly: false},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
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
                data: [],
            }]
        });
    }
    return loadMap;
});