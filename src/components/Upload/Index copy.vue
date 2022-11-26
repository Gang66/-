<template>
  <div>
    <div class="uploader-batch-img">
      <ul>
        <li v-for="(item,index) in ImgUrl" :key="'img'+index">
          <div class="img-box">
            <img :src="item|remoteUrl" />
          </div>
          <div class="but">
            <div class="but-box">
              <span @click="handleMove(index,-1)" title="前移" v-if="dialogIsUpload">
                <i class="el-icon-back"></i>
              </span>
              <span @click="handlePictureCardPreview(item)" style="margin: 0 10px;" title="查看图片">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span @click="handleRemove(index)" class="btn-del" title="删除" v-if="dialogIsUpload">
                <i class="el-icon-circle-close"></i>
              </span>
              <span @click="handleMove(index,1)" title="后移" v-if="dialogIsUpload">
                <i class="el-icon-right"></i>
              </span>
            </div>
          </div>
        </li>
        <template v-if="dialogIsUpload">
          <li class="img-change" v-for="(item,index) in changeList" :key="'ch'+index">
            <div class="img-box">
              <img :src="item.url" />
            </div>
            <div class="but">
              <div class="but-box">
                <span @click="handleRemoveChange(index)" class="btn-del" title="删除">
                  <i class="el-icon-circle-close"></i>
                </span>
              </div>
            </div>
          </li>
        </template>
        <li v-if="dialogIsUpload">
          <el-upload class="medal-uploader-batch-img" ref="upload" action multiple list-type="picture-card" :show-file-list="false" :http-request="customUpload"
            :before-upload="beforeAvatarUpload" :on-change="changeUpload" drag>
            <i class="el-icon-plus medal-uploader-icon"></i>
            <span style="font-size: 16px;">{{uploadTitle}}</span><br>
            <span style="top:40px;color: #999;">格式:JPG/JPEG/PNG</span>
            <span style="top:57px;color: #999;">大小:小于5M</span>
          </el-upload>
        </li>
        <li v-show="isSubmit">
          <el-button @click="submitUpload" type="primary" style="height: 120px;width: 120px;">
            <i class="el-icon-upload" style="display: block;font-size: 62px;"></i>
            <span style=" font-size: 14px;">上传</span>
          </el-button>
        </li>
      </ul>
      <div class="tips" v-if="dialogIsUpload">
        <div v-if="dialogIsRemarks">
          <p><span style="color:red;">说明：</span></p>
          <p>1、可以同时选择多张图片，批量上传；</p>
          <p>2、上传后的图片可根据左右箭头调整位置；</p>
          <p>3、点击“保存”按钮后上传的图片才生效；</p>
        </div>
        <div v-else-if="remarks">
          <p><span style="color:red;">说明：</span></p>
          <p>{{remarks}}</p>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisibleImage" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl|remoteUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import {
  remoteUrl
} from "@/utils";
import {
  postUploadBatchUploadImg
} from "@/api/upload";
export default {
  name: "UploadBatchImgSelectTemplate",
  props: {
    dialogVisible: {
      type: Boolean
    },
    dialogImgData: {
      type: Array
    },
    dialogIsUpload: {
      type: Boolean,
      default () {
        return true; //默认上传
      }
    },
    dialogIsRemarks: {
      type: Boolean,
      default () {
        return true; //默认显示备注
      }
    },
    uploadTitle: {
      type: String,
      default: '上传简历'
    },
    remarks: {
      type: String,
    }
  },
  data () {
    return {
      changeList: [],
      fileList: [],
      isSubmit: false,
      ImgUrl: [],
      dialogVisibleImage: false,
      dialogImageUrl: ""
    };
  },
  watch: {
    dialogImgData: {
      handler (newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          if (this.dialogVisible) {
            console.log('zhx-dia', newVal)
            this.ImgUrl = newVal.filter(x => {
              return x && x != "" && x != "null";
            });
          }
        }
      }
    }
  },
  methods: {
    submitForm () {

      this.handleClose();
    },
    //选取图片
    customUpload (file) {
      this.fileList.push(file.file);
      this.isSubmit = true;
      //let FormDatas = new FormData();
      //FormDatas.append("file", file.file);
      //FormDatas.append("dirName", "recruit");
    },
    //上传图片验证
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 40;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG、png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 40MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },
    //上传图片
    submitUpload () {
      var that = this;
      const formData = new FormData();
      this.fileList.map(v => {
        formData.append("files", v);
        formData.append("dirName", "recruit");
      });

      postUploadBatchUploadImg(formData).then(response => {
        if (response.data.code == 1) {
          that.clearFiles();
          let imgArr = JSON.parse(response.data.data || "[]");
          imgArr.forEach(item => {
            that.ImgUrl.push(item);
          });
          this.$emit("setImgArr", that.ImgUrl);
          this.$message({
            message: "上传成功",
            type: "success"
          });
        } else {
          this.$message({
            message: response.data.message,
            type: "danger"
          });
        }
      });
    },
    changeUpload (file, fileList) {
      this.changeList = fileList;
    },
    //清空已上传的文件列表
    clearFiles () {
      this.isSubmit = false;
      this.fileList = [];
      this.changeList = [];
      this.$refs["upload"].clearFiles(); //清空已上传的文件列表
    },
    //显示图片
    handlePictureCardPreview (url) {
      this.dialogImageUrl = url;
      this.dialogVisibleImage = true;
    },
    //删除图片
    handleRemove (index) {
      this.$confirm("确定删除该图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.ImgUrl.splice(index, 1);
        this.$emit("setImgArr", this.ImgUrl);
      });
    },
    //移动图片
    handleMove (index, num) {
      let len = this.ImgUrl.length;
      if (index + num >= 0 && index + num < len && index < len && index >= 0) {
        let oldImg = this.ImgUrl[index + num] + "";
        let newImg = this.ImgUrl[index] + "";
        this.ImgUrl[index + num] = newImg;
        this.ImgUrl[index] = oldImg;
        this.$forceUpdate();
      } else {
        this.$message({
          message: "无法移动",
          type: "danger"
        });
      }
    },
    //删除选取的图片
    handleRemoveChange (index) {
      this.$confirm("确定删除该图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.changeList.splice(index, 1);
        this.fileList.splice(index, 1);
      });
    }
  },
  filters: {
    remoteUrl (url) {
      return remoteUrl(url);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.uploader-batch-img {
  clear: both;

  ul {
    overflow: hidden;

    li {
      width: 160px;
      height: 131px;
      overflow: hidden;
      float: left;
      padding: 5px;
      position: relative;

      .img-box {
        overflow: hidden;
      }

      img {
        width: 150px;
        height: 121px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        object-fit: cover;
      }

      .but {
        visibility: hidden;
        position: absolute;
        top: 5px;
        right: 5px;
        bottom: 5px;
        left: 5px;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;

        .but-box {
          width: 100%;
          align-self: center;
          text-align: center;
          font-size: 24px;
          color: #fff;
          cursor: pointer;

          span {
            display: inline-block;
          }
          .btn-del {
            position: absolute;
            top: -1px;
            right: 1px;
          }
        }
      }
    }

    li:hover {
      .but {
        visibility: visible;
      }
    }

    li.img-change {
      img {
        border: 1px dashed red;
      }
    }
  }

  .tips {
    clear: both;
    padding: 20px 5px 0;
    font-size: 14px;
    color: #888;
    line-height: 1.5;

    p {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
<style lang="stylesheet/scss" lang="scss">
.medal-uploader-batch-img {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    span {
      position: absolute;
      top: 20px;
      left: 0;
      right: 0;
      font-size: 12px;
    }
  }
  .el-upload-dragger {
    width: 160px;
  }

  .el-upload:hover {
    border-color: #409eff;
  }

  // .el-upload--picture-card {
  //   width: 150px;
  //   height: 121px;
  //   line-height: 80px;
  //   &.el-upload-dragger {
  //     width: 180px;
  //     height: 100%;
  //   }
  // }

  .medal-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
}
</style>
