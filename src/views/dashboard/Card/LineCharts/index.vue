<template>
  <div class="lineCharts" ref="line"></div>
</template>
<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
export default {
  name: "",
  mounted() {
    echarts.use([
      GridComponent,
      LineChart,
      CanvasRenderer,
      UniversalTransition,
    ]);

    var myChart = echarts.init(this.$refs.line);
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
            color: "purple",
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
                  color: "purple", // 0% 处的颜色
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
.lineCharts {
  width: 100%;
  height: 100%;
}
</style>