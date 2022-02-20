<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          v-model="skuInfo.price"
          type="number"
          placeholder="价格（元）"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input
          v-model="skuInfo.weight"
          placeholder="重量（千克）"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" v-model="skuInfo.skuDesc" rows="4"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="sale.saleAttrName" v-for="sale in spuSaleAttrList" :key="sale.id">
            <el-select placeholder="请选择" v-model="sale.attrIdAndValueId">
              <el-option :label="saleValue.saleAttrValueName" :value="`${sale.id}:${saleValue.id}`" v-for="saleValue in sale.spuSaleAttrValueList" :key="saleValue.id"></el-option></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table border style="width: 100%"
            :data="spuImageList">
          <el-table-column
            prop="prop"
            label="label"
            type="selection"
            width="80"
          @selection-change="handleCurrentChange"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
              <template slot-scope="{row}">
                  <img :src="row.imgUrl" style="width:100px;height:100px;">
              </template>
          </el-table-column>
          <el-table-column prop="row.imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{row,$index}">
                  <el-button type="primary" v-show="row.isDefault == 0" @click="changeDefault(row,$index)"> 设置默认</el-button></el-button>
                  <el-button v-show="row.isDefault != 0">默认</el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      skuInfo: {
        category3Id: 0,
        id: 0,
        isSale: 0,
        price: 0,
        skuDesc: "",
        skuAttrValueList: [],
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuName: "",
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
        spuId: 0,
        tmId: 0,
        weight: "",
      },
      spu: {},
      imageList: [],
    };
  },
  methods: {
    async getData(category1Id, category2Id, spu) {
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      let res = await this.$API.sku.reqSpuImageList(spu.id);
      if (res.code == 200) {
        let list = res.data;
        list.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }

      let res1 = await this.$API.sku.reqSpuSaleAttrList(spu.id);
      if (res1.code == 200) {
        this.spuSaleAttrList = res1.data;
      }
      let res2 = await this.$API.sku.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (res2.code == 200) {
        this.attrInfoList = res2.data;
      }
    },
    handleCurrentChange(params) {
      this.imageList = params;
    },
    changeDefault(row, index) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("changeScenes", 0);
      Object.assign(this._data, this.$options.data());
    },
    async save() {
      const { attrInfoList, skuInfo, spuSaleAttrList, imageList } = this;
      //   let arr = []
      //   attrInfoList.forEach((item) => {
      //       if(item.attrIdAndValueId){
      //           const [attrId,valueId]=item.attrIdAndValueId.split(":")
      //           arr.push({attrId,valueId})
      //       }
      //   });
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] =
            item.attrIdAndValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          supImgId: item.id,
        };
      });

      let res = await this.$API.sku.reqAddSku(this.skuInfo);
      if (res.code == 200) {
        this.$message.success("成功");
        this.$emit("changeScenes", 0);
      }
    },
  },
};
</script>
  
<style scoped>
</style>