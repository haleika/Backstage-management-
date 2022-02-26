<template>
  <div class="lineCharts" ref="charts"></div>
</template>
<script>
import * as echarts from "echarts/core";
import { GridComponent, TooltipComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
export default {
  name: "ProgressCharts",
  mounted() {
    echarts.use([GridComponent, BarChart, CanvasRenderer, TooltipComponent]);

    var myChart = echarts.init(this.$refs.charts);
    var option;

    option = {
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          data: [78],
          type: "bar",
          color: "yellowgreen",
          barWidth: 10,
          //   背景颜色
          showBackground: true,
          backgroungStyle: { color: "#eee" },
          label:{
              show:true,
              formatter:"|",
              color:"yellowgreen",
              position:"right"
          }
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
    
</script>
  
<style scoped>
.lineCharts {
  width: 100%;
  height: 100%;
}
</style>