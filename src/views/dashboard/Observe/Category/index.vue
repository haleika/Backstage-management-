<template>
  <el-card>
    <div slot="header" class="category-header">
      <span>销售额类比占比</span>
      <el-radio-group v-model="value">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    var myChart = echarts.init(this.$refs.charts);
    var option;

    option = {
      title: {
        text: "视频",
        subtext: "11212",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          labelLine: {
            show: true,
          },
        },
      ],
    };

    myChart.on("mouseover", (params) => {
      const {name,value} = params.data
      myChart.setOption({
        title:{
          text:name,
          subtext:value
        }
      })
    });

    option && myChart.setOption(option);
  },
};
</script>
  
<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>