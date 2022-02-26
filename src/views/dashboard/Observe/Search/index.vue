<template>
  <el-card>
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12"><lineCharts /></el-col>
        <el-col :span="12"><lineCharts /></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="排名" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="搜索关键字" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="用户数" width="width" sortable>
        </el-table-column>
        <el-table-column prop="prop" label="周涨幅" width="width" sortable>
        </el-table-column>
      </el-table>
      <el-pagination
      class="pagination"
        layout=" prev, pager, next"
        :total="10000"
      >
      </el-pagination>
    </div>
  </el-card>
</template>
<script>
import lineCharts from "./lineCharts";
export default {
  name: "Observe",
  data() {
    return {
      tableData: [{}],
    };
  },
  components: { lineCharts },
};
</script>
  
<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 5px;
}
.pagination{
    float: right;
}
</style>