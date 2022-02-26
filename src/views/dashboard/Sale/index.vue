<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visite"></el-tab-pane>
        </el-tabs>
        <div class="dateSelect">
          <span @click="setDay">本日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            class="date"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="到"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <BarSale :title="title" />
          </el-col>
          <el-col :span="6">
            <RankingList :title="title" />
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import BarSale from "./BarSale";
import RankingList from "./RankingList";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      date: [],
    };
  },
  components: { BarSale, RankingList },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const START = dayjs().day(1).format("YYYY-MM-DD");
      const END = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [START, END];
    },
    setMonth() {
      const START = dayjs().startOf("month").format("YYYY-MM-DD");
      const END = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [START, END];
    },
    setYear() {
      const START = dayjs().startOf("year").format("YYYY-MM-DD");
      const END = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [START, END];
    },
  },
};
</script>
  
<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.dateSelect {
  position: absolute;
  right: 0;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.dateSelect span {
  margin: 0 10px;
}
</style>