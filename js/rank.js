define([
    'Data',
    'echarts'
], function(WeatherData, echarts) {
    var province = ['北京','天津','上海','重庆','河北','河南','云南', '辽宁','黑龙江', '湖南', 
                    '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', 
                    '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏',
                    '四川', '宁夏', '海南', '台湾', '香港', '澳门'];
    var shenghui = ["北京", "天津" , "上海", "重庆", "石家庄", "郑州", "昆明", "沈阳", "哈尔滨", 
                    "长沙", "合肥", "济南", "乌鲁木齐", "苏州", "杭州", "南昌", "武汉", "南宁", 
                    "兰州", "太原", "呼和浩特", "西安", "长春", "福州", "贵阳", "广州", "西宁", 
                    "拉萨", "成都", "银川", "海口", "台北", "香港", "澳门"];
    function loadRank() {
        var data = loadData();
        var provRankDataD = [];
        var provRankDataA = [];
        var rankDataD = [];
        var rankDataA = [];
        for (var i = 0; i < data[0].length; i++) {
            provRankDataD.push(data[0][i].name);
            provRankDataA.push(data[1][i].name);
            rankDataD.push(data[0][i].tem);
            rankDataA.push(data[1][i].tem);
        }
        
        var chart = echarts.init(document.getElementById("rank"));
        var option={           
            //标题
            title:{
                text:'省份温度排行'
            },
            //工具箱
            //保存图片
            toolbox:{
                show:true,
                feature:{
                    magicType: {type: ['bar', 'line']},
                    restore: {},
                    saveAsImage:{
                        show:true
                    }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            //图例-每一条数据的名字叫销量
            legend:{
                data:['温度↓', '温度↑'],
                selected: {
                    '温度↓': true,
                    '温度↑': false
                }
            },
            //x轴
            xAxis:{
                data:provRankDataD
            },
            //y轴没有显式设置，根据值自动生成y轴
            yAxis:{},
            
            //数据-data是最终要显示的数据
            series:[{
                    name:'温度↓',
                    type:'bar',
                    data:rankDataD,                        
                },
                {
                    name:'温度↑',
                    type:'bar',
                    data:rankDataA,
                }
            ]
        };
        //使用刚刚指定的配置项和数据项显示图表
        chart.setOption(option);

        chart.on('legendselectchanged', function(obj) {
            var name = obj.name;
            var option = chart.getOption();
            if(name == '温度↑'){
                option.xAxis[0].data = provRankDataA;
                option.legend[0].selected['温度↓'] = false;
            }else if(name == '温度↓'){
                option.xAxis[0].data = provRankDataD;
                option.legend[0].selected['温度↑'] = false;
            }
            chart.setOption(option, true);
        });
    }
    function loadData() {
        var data ;
        var rank = [];
        for (var i = 0; i < province.length; i++) {
            if (data = WeatherData.getCacheData(shenghui[i])) {
                rank.push({name: province[i], tem: data[0].tem.match(/\d+/)[0]});
            }
        }       
        return [rank.sort(sortNumberDes), rank.slice().sort(sortNumberAsc)];
    }
    function sortNumberDes(a, b) {
        return b.tem - a.tem;
    }
    function sortNumberAsc(a, b) {
        return a.tem - b.tem;
    }
    return loadRank;
});