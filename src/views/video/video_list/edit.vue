<template>
  <el-dialog
    title="编辑视频"
    width="700px"
    @close="cancel"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="Form"
      label-width="100px"
      hide-required-asterisk
    >
      <el-form-item label="年级">
        <el-select class="w-150" v-model="form.grade" placeholder="请选择年级">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          >
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
            <image-uploader
              ref="ImageUploader"
              :imageUrl="imageUrl"
              @getImage="getImage"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频" prop="path">
            <video-uploader
              ref="VideoUploader"
              :videoUrl="videoUrl"
              @getVideo="getVideo"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm" />
    </div>
  </el-dialog>
</template>

<script>
import { updateVideoApi } from "@/api/video";
import ImageUploader from "@/components/ImageUploader";
import VideoUploader from "@/components/VideoUploader";

export default {
  name: "EditVideo",
  components: { VideoUploader, ImageUploader },
  props: ["options"],
  data() {
    return {
      visible: false,
      imageUrl: "",
      videoUrl: "",
      form: {
        video_id: null,
        video_name: "",
        cover: "",
        teacher: "",
        path: "",
        grade: "一年级"
      },
      rules: {
        video_name: { required: true, message: "请输入名称", trigger: "blur" },
        cover: { required: true, message: "请上传封面", trigger: "change" },
        path: { required: true, message: "请上传视频", trigger: "change" }
      }
    };
  },
  methods: {
    getImage(value) {
      this.form.cover = value;
    },
    getVideo(value) {
      this.form.path = value;
    },
    submitForm() {
      this.$refs["Form"].validate(valid => {
        if (valid) {
          this.$refs.SubmitButton.start();
          let data = { ...this.form };
          updateVideoApi(data).then(() => {
            this.$refs.SubmitButton.stop();
            this.$emit("update");
            this.cancel();
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.visible = false;
      Object.assign(this.$data.form, this.$options.data().form);
      this.$refs.ImageUploader.clearFiles();
      this.$refs.VideoUploader.clearFiles();
      this.$refs["Form"].resetFields();
    }
  }
};
</script>

<style scoped></style>
