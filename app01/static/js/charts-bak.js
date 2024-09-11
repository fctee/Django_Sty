/**
 * 初始化并管理图表
 * @returns {Object} 包含公共方法的对象
 */
function initCharts() {
    let pieChart = null;
    let barChart = null;

    /**
     * 初始化饼图
     */
    function initPie() {
        const chartDom = document.getElementById('m2');
        if (!chartDom) {
            console.error('Cannot find element with id "m2"');
            return;
        }

        try {
            pieChart = echarts.init(chartDom);
            const option = {
                // 饼图配置项
                title: {
                    text: '费用占比',
                    subtext: '云厂商',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 0
                },
                series: [{
                    name: '费用',
                    type: 'pie',
                    radius: '50%',
                    data: [],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };

            pieChart.setOption(option);
            updatePieData();
        } catch (error) {
            console.error('Error initializing pie chart:', error);
        }
    }

    /**
     * 更新饼图数据
     */
    function updatePieData() {
        if (!pieChart) {
            console.error('Pie chart not initialized');
            return;
        }

        $.ajax({
            url: "/bill/pie/",
            type: "get",
            dataType: "JSON",
            success: function (res) {
                if (res.status === 200) {
                    pieChart.setOption({
                        series: [{
                            data: res.data
                        }]
                    });
                } else {
                    console.error('Unexpected status code:', res.status)
                }
            },
            error: function (res) {
                console.error('Error fetching pie data:', res);
            }
        });
    }

    /**
     * 初始化柱状图
     */
    function initBar() {
        const chartDom = document.getElementById('m1');
        if (!chartDom) {
            console.error('Cannot find element with id "m1"');
            return;
        }

        try {
            barChart = echarts.init(chartDom, null, {renderer: 'canvas'});
            barChart.showLoading();

            const option = {
                // 柱状图配置项
                title: {
                    text: "部门费用表",
                    subtext: "按部门划分",
                    left: "center",
                },
                tooltip: {},
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {yAxisIndex: 'none'},
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataset: [{
                    dimensions: ['department', 'total_amount'],
                    source: []
                }, {
                    transform: {
                        type: 'sort',
                        config: {dimension: 'total_amount', order: 'desc'}
                    }
                }],
                xAxis: {
                    type: 'category',
                    axisLabel: {interval: 0, rotate: 30, fontSize: 10}
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '部门费用',
                    type: 'bar',
                    encode: {x: 'department', y: 'total_amount'},
                    datasetIndex: 1,
                    barWidth: '60%',
                    colorBy: "data"
                }]
            };

            barChart.setOption(option);
            updateBarData();
        } catch (error) {
            console.error('Error initializing bar chart:', error);
        }
    }

    /**
     * 更新柱状图数据
     */
    function updateBarData() {
        if (!barChart) {
            console.error('Bar chart not initialized');
            return;
        }

        $.ajax({
            url: "/bill/bar/",
            type: "get",
            dataType: "JSON",
            success: function (res) {
                if (res.status === 200) {
                    barChart.setOption({
                        dataset: [{
                            source: res.data
                        }]
                    });
                    barChart.hideLoading();
                } else {
                    console.error('Unexpected status code:', res.status)
                }
            },
            error: function (res) {
                console.error('Error fetching bar data:', res);
                barChart.hideLoading();
            }
        });
    }

    /**
     * 调整图表大小以适应窗口变化
     */
    function resizeCharts() {
        if (pieChart) pieChart.resize();
        if (barChart) barChart.resize();
    }

    /**
     * 初始化所有图表
     */
    function init() {
        if (typeof echarts === 'undefined') {
            console.error('ECharts library not loaded');
            return;
        }

        initPie();
        initBar();
        window.addEventListener('resize', resizeCharts);
    }

    /**
     * 销毁所有图表实例并移除事件监听器
     */
    function destroy() {
        if (pieChart) {
            pieChart.dispose();
            pieChart = null;
        }
        if (barChart) {
            barChart.dispose();
            barChart = null;
        }
        window.removeEventListener('resize', resizeCharts);
    }

    // 在 DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 0);
    }

    // 返回公共方法
    return {
        updatePieData: updatePieData,
        updateBarData: updateBarData,
        resize: resizeCharts,
        destroy: destroy
    };
}

// 使用方法
const charts = initCharts();

// 使用示例:
// charts.updatePieData();
// charts.updateBarData();
// charts.resize();
// charts.destroy();
