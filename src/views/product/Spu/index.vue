<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="scence == 0">
        <!-- 展示spu列表结构 -->
        <el-button
          :disabled="!category3Id"
          style="margin: 10px 0"
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          >添加spu</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <hint-button
                size="mini"
                type="success"
                icon="el-icon-plus"
                title="新增spu"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                size="mini"
                type="warning"
                icon="el-icon-edit"
                title="修改spu"
                @click="editSpu(row)"
              ></hint-button>
              <hint-button
                size="mini"
                type="info"
                icon="el-icon-info"
                title="查看spu"
                @click="showDialo(row)"
              ></hint-button>
              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
         -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getSpuList"
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm
        ref="spu"
        v-show="scence == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <SkuForm
        v-show="scence == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>
    </el-card>

    <el-dialog
      :title="`${spu.spuName}的列表}`"
      :visible.sync="dialogTableVisible"
      width="80%"
      @before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" v-loading="loading">
        <el-table-column
          prop="skuName"
          label="名称"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="200"
        ></el-table-column>
        <el-table-column label="默认图片" width="200">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100%"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  data() {
    return {
      isShowTable: true,
      category1Id: "",
      category2Id: "",
      category3Id: "",
      records: [],
      total: 0,
      page: 1,
      limit: 3,
      scence: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
    };
  },
  components: {
    SkuForm,
    SpuForm,
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else if (level == 3) {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let res = await this.$API.spu.resSpuList(page, limit, category3Id);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
        this.pages = res.data.pages;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList(this.page);
    },
    addSpu() {
      this.scence = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    editSpu(row) {
      this.scence = 1;
      // 获取spu
      this.$refs.spu.initSpuData(row);
    },
    changeScene({ scence, flag }) {
      this.scence = scence;
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList(1);
      }
    },
    async deleteSpu(row) {
      let res = this.$API.spu.resDeleteSpu(row.id);
      if (res.code == 200) {
        this.$message.success("删除成功");
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    addSku(row) {
      this.scence = 2;
      let { category1Id, category2Id } = this;
      this.$refs.sku.getData(category1Id, category2Id, row);
    },
    changeScenes(scence) {
      this.scence = scence;
    },
    async showDialo(row) {
      this.dialogTableVisible = true;
      this.spu = row;
      let res = await this.$API.sku.reqSpuList(row.id);
      if (res.code == 200) {
        this.skuList = res.data;
        this.loading = false;
      }
    },
    close() {
      this.loading = true;
      this.spu = {};
    },
  },
};
</script>
  
<style scoped>
</style>