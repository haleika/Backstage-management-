<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
    </div>
    <div class="main">
      <span class="title">1213</span>
      <span>
          <span>17.1</span>
          <i class="el-icon-sort-up"></i>
          <i class="el-icon-sort-down"></i></span>
    </div>
    <div class="footer">
        <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
export default {
  name: "lineCharts",
  mounted() {
    echarts.use([
      GridComponent,
      LineChart,
      CanvasRenderer,
      UniversalTransition,
    ]);

    var myChart = echarts.init(this.$refs.charts);
    var option;

    option = {
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: [10, 7, 33, 12, 28, 9, 29, 10, 44],
          type: "line",
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "#66ccff",
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#66ccff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false,
            },
          },
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    };

    option && myChart.setOption(option);
  },
};
</script>
  
<style scoped>
.charts{
    width: 100%;
    height: 300px;
}
.header span{

}
.main span{
    font-size: 22px;
    font-weight: bold;
}
</style>