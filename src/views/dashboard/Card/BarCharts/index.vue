<template>
  <div class="barCharts" ref="charts"></div>
</template>
<script>
import * as echarts from "echarts/core";
import { GridComponent,TooltipComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
export default {
  name: "BarCharts",
  mounted() {
    echarts.use([GridComponent, BarChart, CanvasRenderer,TooltipComponent]);

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
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
    };

    option && myChart.setOption(option);
  },
};
</script>
  
<style scoped>
.barCharts {
  width: 100%;
  height: 100%;
}
</style>