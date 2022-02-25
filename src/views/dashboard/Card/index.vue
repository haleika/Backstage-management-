<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <Detail title="总销售额" count="88460">
          <template slot="charts">
            <span
              >周同比&nbsp;&nbsp;12% <span class="el-icon-sort-up"></span>
            </span>
            <span
              >日同比&nbsp;&nbsp;12% <span class="el-icon-sort-down"></span>
            </span>
          </template>
          <template slot="footer">
            <span>日销售额￥123658</span>
          </template>
        </Detail>
      </el-col>
      <el-col :span="6">
        <Detail title="访问量" count="88460">
          <template slot="charts"> </template>
          <template slot="footer">
            <span>日访问量123658</span>
          </template>
        </Detail></el-col
      >
      <el-col :span="6">
        <Detail title="支付笔数" count="88460">
          <template slot="charts"> </template>
          <template slot="footer">
            <span>转化率123658</span>
          </template>
        </Detail>
      </el-col>
      <el-col :span="6">
        <Detail title="运营活动效果" count="88460">
          <template slot="charts"> </template>
          <template slot="footer">
            <span
              >周同比&nbsp;&nbsp;12% <span class="el-icon-sort-up"></span>
            </span>
            <span
              >日同比&nbsp;&nbsp;12% <span class="el-icon-sort-down"></span>
            </span>
          </template>
        </Detail>
      </el-col>
    </el-row>
  </div>
</template>
    
<script>
import Detail from "./Detail";
export default {
  name: "Card",
  components: { Detail },
};
</script>
    