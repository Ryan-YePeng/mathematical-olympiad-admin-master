<template>
  <el-dialog
    id="reply-form"
    title="回答"
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
      <el-form-item label="回答内容" prop="message">
        <el-input type="textarea" v-model="form.message"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm" />
    </div>
  </el-dialog>
</template>

<script>
import { addAnswerApi } from "@/api/question";
import { objectEvaluate } from "@/utils/common";

export default {
  name: "AddPhone",
  data() {
    return {
      visible: false,
      form: {
        username: "",
        avatar: "",
        message: "",
        question_id: null,
        user_id: null
      },
      rules: {
        message: { required: true, message: "请输入回复", trigger: "blur" }
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    submitForm() {
      this.$refs["Form"].validate(valid => {
        if (valid) {
          let data = { ...this.form };
          objectEvaluate(this.user, data);
          this.$refs.SubmitButton.start();
          addAnswerApi(data).then(() => {
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
      this.$refs["Form"].resetFields();
    }
  }
};
</script>

<style lang="scss">
#reply-form {
  .el-textarea__inner {
    height: 100px;
  }
}
</style>
