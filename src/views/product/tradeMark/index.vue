<template>
  <div>
    <el-button type="primary" icon="el-icen-plus" style="margin: 10px 0px"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="60px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" size="mini" icon="el-icon-delete"
            >修改</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
         -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getPageList"
      style="margin-top: 20px; text-align: center"
      :current-page="pageInfo.page"
      :total="pageInfo.total"
      :page-count="5"
      :page-size="pageInfo.limit"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,total, sizes"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "tradeMark",
  data() {
    return {
      pageInfo: {
        page: 1,
        limit: 5,
        total: 0,
      },
      list: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.pageInfo.page = pager;
      let { page, limit } = this.pageInfo;
      let res = await this.$API.trademark.reqTradeMark(page, limit);
      if (res.code == 200) {
        this.list = res.data.records;
        this.pageInfo.total = res.data.total;
      }
    },
    handleSizeChange(limit) {
        this.pageInfo.limit = limit
        this.getPageList()
    },
  },
};
</script>
  
<style scoped>
</style>