<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="spu名称">
        <el-input placeholder="spu名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          type="textarea"
          v-model="spu.description"
          placeholder="描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          value=""
          v-model="attrIdAndAttrName"
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
        >
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="width"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputComfirm(row)"
                @keyup.native.enter="handleInputComfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "SpuForm",
  data() {
    return {
      attrIdAndAttrName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0,
        description: "",
        spuImageList: [],
        spuName: "",
        spuSaleAttrList: [],
        tmId: "",
      },
      tradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
    };
  },
  computed: {
    unSelectSaleAttr() {
      return this.baseSaleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((e) => {
          return item.name != e.saleAttrName;
        });
      });
    },
  },
  methods: {
    handleRemove(file, fileList) {
      // 收集照片墙
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async initSpuData(spu) {
      console.log(spu);
      let res_spu = await this.$API.spu.resSpu(spu.id);
      if (res_spu.code == 200) this.spu = res_spu.data;

      let res_tradeMarkList = await this.$API.spu.resTrademarkList();
      if (res_tradeMarkList.code == 200)
        this.tradeMarkList = res_tradeMarkList.data;

      let res_spuImageList = await this.$API.spu.resSpuImgeList(spu.id);
      if (res_spuImageList.code == 200) {
        let listArr = res_spuImageList.data;
        listArr.forEach((item) => {
          item.url = item.imgUrl;
          item.name = item.imgName;
        });
        this.spuImageList = listArr;
      }

      let res_BaseSaleAttrList = await this.$API.spu.resGetBaseSaleAttrList();
      if (res_BaseSaleAttrList.code == 200)
        this.baseSaleAttrList = res_BaseSaleAttrList.data;
    },
    // 照片墙图片上传成功回调
    handlerSuccess(respones, file, fileList) {
      this.spuImageList = fileList;
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
      this.attrIdAndAttrName = "";
    },
    addSaleAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    handleInputComfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message.warning("不能为空");
        row.inputVisible = false;
        return;
      }

      let res = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!res) return;

      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
      row.inputVisible = false;
    },
    async addOrUpdateSpu() {
      // await this.$API.spu.resAddOrUpdateSpu()
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let res = await this.$API.spu.resAddOrUpdateSpu(this.spu);
      if (res.code == 200) {
        this.$message.success("保存成功");
        this.$emit("changeScene", {scence:0,flag:this.spu.id?"修改":"增加"});
        Object.assign(this._data,this.$options.data())
      }
    },
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      let res_tradeMarkList = await this.$API.spu.resTrademarkList();
      if (res_tradeMarkList.code == 200)
        this.tradeMarkList = res_tradeMarkList.data;

      let res_BaseSaleAttrList = await this.$API.spu.resGetBaseSaleAttrList();
      if (res_BaseSaleAttrList.code == 200)
        this.baseSaleAttrList = res_BaseSaleAttrList.data;
    },
    cancel(){
        this.$emit('changeScene', { scence:0, flag:"" })
        //this.$options可以获取配置对象，配置对象的打他函数执行，返回响应式数据为空的
        Object.assign(this._data,this.$options.data())
    }
  },
};
</script>
  
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>