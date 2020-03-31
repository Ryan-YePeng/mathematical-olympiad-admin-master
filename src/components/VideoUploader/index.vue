<template>
  <div>
    <el-upload
      v-loading="isLoading"
      ref="VideoUploader"
      class="video-uploader"
      action="video-upload"
      accept=".avi,.mp4,.flv,.wmv,.mkv"
      :http-request="uploadFile"
      :show-file-list="false"
    >
      <video v-if="url" :src="url" class="custom-video"></video>
      <i v-else class="el-icon-plus video-uploader-icon"></i>
    </el-upload>
    <el-progress
      v-show="isLoading"
      :percentage="percentage"
      :color="customColor"
    ></el-progress>
  </div>
</template>

<script>
import { uploadFileApi } from "@/api/file";

export default {
  name: "VideoUploader",
  props: {
    videoUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isLoading: false,
      url: "",
      percentage: 0,
      customColor: [
        { color: "#909399", percentage: 40 },
        { color: "#1989fa", percentage: 80 },
        { color: "#67c23a", percentage: 100 }
      ]
    };
  },
  watch: {
    videoUrl(value) {
      this.url = value;
    }
  },
  methods: {
    clearFiles() {
      this.url = "";
      this.percentage = 0;
      this.$refs.VideoUploader.clearFiles();
    },
    /* 自定义上传 */
    uploadFile(param) {
      const { file } = param;
      const type = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      const size = file.size / 1024 / 1024;
      if (
        type !== "avi" &&
        type !== "mp4" &&
        type !== "flv" &&
        type !== "wmv" &&
        type !== "mkv"
      ) {
        this.$errorMsg("上传视屏只能是 AVI、 MP4、 FLV、 WMV，MKV 格式!");
        return false;
      }
      if (size > 40) {
        this.$errorMsg("上传视屏大小不能超过 40MB!");
        return false;
      }
      this.isLoading = true;
      uploadFileApi({ pic: file }, this.update)
        .then(result => {
          this.isLoading = false;
          this.percentage = 0;
          let response = result.data;
          if (response.status === 200) {
            this.$emit("getVideo", response.path);
            this.url = URL.createObjectURL(file);
          } else {
            this.$successMsg("上传失败");
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.percentage = 0;
        });
    },
    update(value) {
      this.percentage = value;
    }
  }
};
</script>

<style lang="scss">
.video-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.video-uploader .el-upload:hover {
  border-color: #409eff;
}

.video-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.custom-video {
  width: 178px;
  height: 178px;
  display: block;
}

.video-uploader {
  .el-loading-mask {
    width: 168px;
    height: 168px;
    margin: 5px;
  }
}
</style>
