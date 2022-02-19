<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%">
          <el-table-column prop="prop" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`确定删除${row.attrName}吗？`"
                @onConfirm="deleteAttr(row)"
              >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            :disabled="!attrInfo.attrName"
            icon="el-icon-plus"
            @click="addAttrValue"
            >添加属性值</el-button
          >
          <el-button type="primary" @click="isShowTable = true">取消</el-button>
          <el-table
            style="width: 100%; margin: 20px"
            border
            :data="attrInfo.attrValueList"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column prop="prop" label="属性值名称">
              <template slot-scope="{ row, $index }">
                <el-input
                  @keyup.native.enter="toLook($event, row)"
                  @blur="toLook($event, row)"
                  v-show="row.flag"
                  v-model="row.valueName"
                  size="mini"
                  placeholder="请输入属性值名称"
                  :ref="$index"
                ></el-input>
                <span
                  v-show="!row.flag"
                  @click="toEdit(row, $index)"
                  style="display: block"
                  >{{ row.valueName }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作">
              <template slot-scope="{ row, $index }">
                <el-popconfirm
                  :title="`确定删除${row.valueName}吗？`"
                  @onConfirm="deleteAttrValue($index)"
                  ><el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    slot="reference"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            type="primary"
            @click="addOrUpdateAttr"
            :disabled="attrInfo.attrValueList.length < 1"
            >保存</el-button
          >
          <el-button @click="isShowTable = true">取消</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import cloneDeep from "loadsh/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowTable: true,
      // 收集新增属性或者修改属性
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
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
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let res = await this.$API.attr.reqGetAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (res.code == 200) {
        this.attrList = res.data;
      }
    },
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    addAttr() {
      //添加属性
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    updateAttr(row) {
      // 修改商品属性
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样也是可以添加属性，但它不是响应式数据
        // item.flag = false
        this.$set(item, "flag", false);
      });
    },
    toLook($event, row) {
      if (row.valueName.trim() == "") {
        this.$message.warning("请输入正确的属性值！");
        return;
      }
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      row.flag = false;
    },
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async deleteAttr({id}){
      try{
        await this.$API.attr.reqDeleteAttr(id)
        this.getAttrList()
        this.$message.success("删除成功")
      } catch{
        this.$message.error("删除失败")
      }
    },
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList.filter((item) => {
        if (item.valueName != "") {
          // 删除掉flag
          delete item.flag;
          return true;
        }
      });
      try {
        await this.$API.attr.reqAddOrUodateAttr(this.attrInfo);
        this.getAttrList();
        this.$message.success("保存成功");
        this.isShowTable = true;
      } catch {
        this.$message.error("失败");
      }
    },
  },
};
</script>
  
<style scoped>
</style>