<template>
  <div>
    <el-table style="width: 100%" border :data="skuList">
      <el-table-column label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"> </el-table-column>
      <el-table-column prop="price" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-down"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
          ></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info"></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getskuList"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      style="text-align: center"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 3,
      skuList: [],
      total: 0,
    };
  },
  mounted() {
    this.getskuList();
  },
  methods: {
    async getskuList(pages = 1) {
      this.page = pages;
      let { page, limit } = this;
      let res = await this.$API.sku.reqSkuList(page, limit);
      if (res.code == 200) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getskuList();
    },
  },
};
</script>
  
<style scoped>
</style>