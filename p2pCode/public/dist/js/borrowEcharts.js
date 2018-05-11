// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
        title : {
            text: 'P2P系Q借贷平台借款金额报表',
            subtext: '2017-05',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%) "
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['信用贷款','汽车抵押贷款','房屋抵押贷款']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: false, //关闭漏斗图
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left'
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        //可拖拽重计算属性
        calculable : true,
        series : [
            {
                name:'该借款类型占比',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    // {value:335, name:'信用贷款'},
                    // {value:310, name:'汽车抵押贷款'},
                    // {value:234, name:'房屋抵押贷款'}
                ]
            }
        ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

$.get("borrow/getecharts",function(dataJson){
    //console.log(data);
    //将接收到的值写入默认数据
    option.series[0].data=dataJson;

    // 隐藏加载动画
    myChart.hideLoading();

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
