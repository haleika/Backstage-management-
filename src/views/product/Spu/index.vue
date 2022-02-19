<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="scence == 0">
        <!-- 展示spu列表结构 -->
        <el-button :disabled="!category3Id" style="margin: 10px 0" type="primary" icon="el-icon-plus"
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
            <template slot-scope="{ row, $index }">
              <hint-button
                size="mini"
                type="success"
                icon="el-icon-plus"
                title="新增spu"
                @click="addSpu"
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
              ></hint-button>
              <hint-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                title="删除"
              ></hint-button>
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
      <SpuForm ref="spu" v-show="scence == 1" @changeScene="changeScene"></SpuForm>
      <SkuForm v-show="scence == 2"></SkuForm>
    </el-card>
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
    addSpu(){
      this.scence = 1
    },
    editSpu(row){
      this.scence = 1
      // 获取spu
      this.$refs.spu.initSpuData(row)
    },
    changeScene(scence){
      this.scence = scence
    }
  },
};
</script>
  
<style scoped>
</style>