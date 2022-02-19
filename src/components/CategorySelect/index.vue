<template>
  <!-- 
    inline 代表行内表单
 -->
  <el-form :inline="true" class="demo-form-inline" :from="cForm">
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        @change="handler1"
        v-model="cForm.category1Id"
        :disabled="show"
      >
        <el-option
          v-for="c1 in list1"
          :key="c1.id"
          :label="c1.name"
          :value="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        @change="handler2"
        v-model="cForm.category2Id"
        :disabled="show"
      >
        <el-option
          v-for="c2 in list2"
          :key="c2.id"
          :label="c2.name"
          :value="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        @change="handler3"
        v-model="cForm.category3Id"
        :disabled="show"
      >
        <el-option
          v-for="c3 in list3"
          :key="c3.id"
          :label="c3.name"
          :value="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
    
<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      //   收集id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let res = await this.$API.attr.reqGetCategory1List();
      if (res.code === 200) {
        this.list1 = res.data;
      }
    },
    async handler1() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      const { category1Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category1Id, level: 1 });
      let res = await this.$API.attr.reqGetCategory2List(category1Id);
      if (res.code === 200) {
        this.list2 = res.data;
      }
    },
    async handler2() {
      this.list3 = [];
      this.cForm.category3Id = "";
      const { category2Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category2Id, level: 2 });
      let res = await this.$API.attr.reqGetCategory3List(category2Id);
      if (res.code === 200) {
        this.list3 = res.data;
      }
    },
    async handler3() {
      let { category3Id } = this.cForm;
      this.$emit("getCategoryId", { categoryId: category3Id, level: 3 });
    },
  },
};
</script>
    