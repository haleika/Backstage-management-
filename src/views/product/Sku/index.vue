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
            @click="sale(row)"
            v-show="row.isSale == 0"
          ></el-button>
          <el-button
            type="success"
            size="mini"
            icon="el-icon-sort-up"
            @click="cancel(row)"
            v-show="row.isSale != 0"
          ></el-button>
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="reqGetSkuById(row)"
          ></el-button>
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

    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            style="margin-right: 10px"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            >{{ attr.attrId }}-{{ attr.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width:100%;height:150px;"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
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
      skuInfo: {},
      drawer: false,
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
    async sale(row) {
      let res = await this.$API.sku.reqSale(row.id);
      if (res.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    async cancel(row) {
      let res = await this.$API.sku.reqCancel(row.id);
      if (res.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    edit() {
      this.$message.info("正在开发中");
    },
    async reqGetSkuById(row) {
      let res = await this.$API.sku.reqGetSkuById(row.id);
      if (res.code == 200) {
        this.skuInfo = res.data;
        this.drawer = true;
      }
    },
  },
};
</script>
  
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}

</style>

<style>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__button{
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}
</style>