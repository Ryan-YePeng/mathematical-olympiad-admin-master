<template>
  <el-dialog
          id="add-video"
          title="新增视频"
          width="700px"
          @close="cancel"
          :close-on-click-modal="false"
          :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px" hide-required-asterisk>
      <el-form-item label="年级">
        <el-select
                class="w-150"
                v-model="form.grade"
                placeholder="请选择年级">
          <el-option
                  v-for="item in options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视屏名称" prop="video_name">
            <el-input v-model="form.video_name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="授课老师">
            <el-input v-model="form.teacher"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="视频封面" prop="cover">
            <el-upload
                    ref="CoverUpload"
                    name="pic"
                    class="avatar-uploader"
                    :headers="headers"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleCoverSuccess"
                    :before-upload="beforeCoverUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频" prop="path">
            <el-upload
                    ref="VideoUpload"
                    name="pic"
                    class="avatar-uploader"
                    :headers="headers"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleVideoSuccess"
                    :before-upload="beforeVideoUpload">
              <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addVideoApi} from '@/api/video'
  import {uploadFileUrl} from '@/api/file'
  import VideoList from "@/views/video/video_list/index";

  export default {
    name: "AddPhone",
    components: {VideoList},
    props: ['options'],
    data() {
      return {
        imageUrl: '',
        videoUrl: '',
        visible: false,
        form: {
          video_name: '',
          cover: '',
          teacher: '',
          path: '',
          grade: '一年级'
        },
        rules: {
          video_name: {required: true, message: '请输入名称', trigger: 'blur'},
          cover: {required: true, message: '请上传封面', trigger: 'change'},
          path: {required: true, message: '请上传视频', trigger: 'change'},
        }
      }
    },
    computed: {
      action() {
        return process.env.VUE_APP_BASE_API + uploadFileUrl
      },
      headers() {
        return {'Authorization': this.$store.getters.token}
      }
    },
    methods: {
      /* 上传视屏 */
      handleVideoSuccess(result, file) {
        if (result.status === 200) {
          this.$successMsg('上传成功');
          this.form.path = result.path;
          this.videoUrl = URL.createObjectURL(file.raw);
        } else {
          this.$successMsg('上传失败');
        }
      },
      beforeVideoUpload(file) {
        const type = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        const size = file.size / 1024 / 1024;
        if (type !== 'avi' && type !== 'mp4' && type !== 'flv' && type !== 'wmv' && type !== 'mkv') {
          this.$errorMsg('上传视屏只能是 AVI、 MP4、 FLV、 WMV，MKV 格式!');
          return false
        }
        if (size > 40) {
          this.$errorMsg('上传视屏大小不能超过 40MB!');
          return false
        }
        return true
      },
      /* 上传封面 */
      handleCoverSuccess(result, file) {
        if (result.status === 200) {
          this.$successMsg('上传成功');
          this.form.cover = result.path;
          this.imageUrl = URL.createObjectURL(file.raw);
        } else {
          this.$successMsg('上传失败');
        }
      },
      beforeCoverUpload(file) {
        const type = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        const size = file.size / 1024 / 1024;
        if (type !== 'jpg' && type !== 'png') {
          this.$errorMsg('上传视屏封面只能是 JPG, PNG 格式!');
          return false
        }
        if (size > 2) {
          this.$errorMsg('上传视屏封面大小不能超过 2MB!');
          return false
        }
        return true
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            this.$refs.SubmitButton.start();
            let data = {...this.form};
            addVideoApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit('update');
              this.cancel()
            });
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.imageUrl = '';
        this.$refs.CoverUpload.clearFiles();
        this.videoUrl = '';
        this.$refs.VideoUpload.clearFiles();
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>

<style lang="scss">
  #add-video {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
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
  }
</style>
