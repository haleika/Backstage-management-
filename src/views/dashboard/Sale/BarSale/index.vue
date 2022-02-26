<template>
  <div class="charst" ref="bar"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "BarSale",
  props: ["title"],
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    title() {
      this.myChart.setOption({
        title: {
          text: this.title,
        },
      });
    },
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.bar);
    var option;

    option = {
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 390, 330, 220, 390, 330],
        },
      ]
    };

    option && this.myChart.setOption(option);
  },
};
</script>
  
<style scoped>
.charst {
  width: 100%;
  height: 400px;
}
</style>