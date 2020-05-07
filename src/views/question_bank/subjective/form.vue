<template>
  <el-card class="box-card subjective-form">
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" :content="title"></el-page-header>
    </div>
    <el-form
      :model="form"
      :rules="rules"
      ref="Form"
      label-width="80px"
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
      <el-form-item label="题目">
        <custom-editor ref="Editor"></custom-editor>
      </el-form-item>
      <el-form-item label="分值" prop="score">
        <el-input-number
          v-model="form.score"
          controls-position="right"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="答案" prop="answer">
        <el-input v-model="form.answer"></el-input>
      </el-form-item>
      <el-form-item label="解析" prop="parsing">
        <el-input type="textarea" v-model="form.parsing"></el-input>
      </el-form-item>
    </el-form>
    <submit-button
      ref="SubmitButton"
      @submit="submitForm"
      class="float-right mb-15"
    />
  </el-card>
</template>

<script>
import CustomEditor from "@/components/CustomEditor";
import { addSubjectiveApi, updateSubjectiveApi } from "@/api/question";

export default {
  name: "SubjectiveForm",
  components: { CustomEditor },
  props: ["options"],
  data() {
    return {
      visible: false,
      title: "",
      form: {
        subjective_id: null,
        grade: "一年级",
        question: "",
        score: 0,
        answer: "",
        parsing: ""
      },
      rules: {
        score: { required: true, message: "请输入分值", trigger: "change" },
        answer: { required: true, message: "请输入答案", trigger: "blur" },
        parsing: { required: true, message: "请输入解析", trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["Form"].validate(valid => {
        if (valid) {
          let data = { ...this.form };
          data.question = this.$refs.Editor.getContent();
          this.$refs.SubmitButton.start();
          if (this.title === "新增填空题") {
            delete data.subjective_id;
            addSubjectiveApi(data)
              .then(() => {
                this.$refs.SubmitButton.stop();
                this.$emit("update");
                this.$emit("tab");
                this.init();
              })
              .catch(() => {
                this.$refs.SubmitButton.stop();
              });
          } else {
            updateSubjectiveApi(data)
              .then(() => {
                this.$refs.SubmitButton.stop();
                this.$emit("update");
                this.$emit("tab");
                this.init();
              })
              .catch(() => {
                this.$refs.SubmitButton.stop();
              });
          }
        } else {
          return false;
        }
      });
    },
    goBack() {
      this.$emit("tab");
      this.init();
    },
    init() {
      Object.assign(this.$data.form, this.$options.data().form);
      this.$refs["Form"].resetFields();
      this.$refs.Editor.setContent();
    }
  }
};
</script>

<style lang="scss">
.subjective-form {
  .el-textarea__inner {
    height: 100px;
  }
}
</style>
