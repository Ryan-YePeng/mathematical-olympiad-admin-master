<template>
  <el-card class="box-card choice-form">
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
      <el-form-item label="选项A" prop="optionsA">
        <el-input v-model="form.optionsA"></el-input>
      </el-form-item>
      <el-form-item label="选项B" prop="optionsB">
        <el-input v-model="form.optionsB"></el-input>
      </el-form-item>
      <el-form-item label="选项C" prop="optionsC">
        <el-input v-model="form.optionsC"></el-input>
      </el-form-item>
      <el-form-item label="选项D" prop="optionsD">
        <el-input v-model="form.optionsD"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-radio-group v-model="form.answer">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="解析">
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
import { addChoiceApi, updateChoiceApi } from "@/api/question";

export default {
  name: "ChoiceForm",
  components: { CustomEditor },
  props: ["options"],
  data() {
    return {
      visible: false,
      title: "",
      form: {
        choice_id: null,
        grade: "一年级",
        question: "",
        optionsA: "",
        optionsB: "",
        optionsC: "",
        optionsD: "",
        answer: "A",
        parsing: ""
      },
      rules: {
        optionsA: { required: true, message: "请输入选项", trigger: "blur" },
        optionsB: { required: true, message: "请输入选项", trigger: "blur" },
        optionsC: { required: true, message: "请输入选项", trigger: "blur" },
        optionsD: { required: true, message: "请输入选项", trigger: "blur" }
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
          if (this.title === "新增选择题") {
            delete data.choice_id;
            addChoiceApi(data)
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
            updateChoiceApi(data)
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
.choice-form {
  .el-textarea__inner {
    height: 100px;
  }
}
</style>
