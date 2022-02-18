<template>
  <div>
    <el-button
      type="primary"
      icon="el-icen-plus"
      style="margin: 10px 10px"
      @click="addTradeMark"
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
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-delete"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getPageList"
      style="margin-top: 20px; text-align: center"
      :current-page="pageInfo.page"
      :total="pageInfo.total"
      :page-count="3"
      :page-size="pageInfo.limit"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->,total, sizes"
    >
    </el-pagination>
    <el-dialog
      :title="`${this.tmFrom.id ? '修改' : '添加'}品牌`"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="tmFrom" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input autocomplete="off" v-model="tmFrom.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      dialogFormVisible: false,
      tmFrom: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 5 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
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
      this.pageInfo.limit = limit;
      this.getPageList();
    },
    addTradeMark() {
      this.tmFrom = {
        tmName: "",
        logoUrl: "",
      };
      this.dialogFormVisible = true;
    },
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmFrom = { ...row };
    },
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let res = await this.$API.trademark.reqDeleteTradeMark(row.id);
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getPageList(this.pageInfo.page);
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.tmFrom.logoUrl = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          let res = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmFrom
          );
          if (+res.code === 200) {
            this.$message.success(`${this.tmFrom.id ? "修改" : "添加"}成功`);
            this.getPageList(this.pageInfo.page);
            this.dialogFormVisible = false;
          }
        } else {
          this.$message.warning(res.data);
          return false;
        }
      });
    },
  },
};
</script>
  
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>