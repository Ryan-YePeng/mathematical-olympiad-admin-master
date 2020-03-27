<template>
  <el-dialog
          title="修改密码"
          width="450px"
          :visible.sync="passwordDialogVisible"
          append-to-body
          @close="cancel"
          :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px" hide-required-asterisk>
      <el-form-item label="旧密码:" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPassword">
        <el-input type="password" v-model="form.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitPasswordForm('form')" :loading="isLoading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updatePasswordApi} from '../../api/person'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      return {
        isLoading: false,
        passwordDialogVisible: false,
        form: {
          oldPassword: '',
          newPassword: '',
          checkPassword: ''
        },
        rules: {
          oldPassword: {required: true, message: '请输入旧密码', trigger: 'blur'},
          newPassword: {required: true, message: '请输入新密码', trigger: 'blur'},
          checkPassword: {required: true, validator: validatePass, trigger: 'blur'}
        }
      }
    },
    computed: {
      userId() {
        return this.$store.getters.userId;
      }
    },
    methods: {
      // 提交密码表单
      submitPasswordForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoading = true;
            let data = {
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword
            };
            data.u_id = this.userId;
            updatePasswordApi(data).then(result => {
              if (result.data.status === 200) {
                this.isLoading = false;
                this.$removeCookiesStorage('logisticsAdminMasterToken');
                this.$removeSessionStorage('logisticsAdminMasterLayout');
                this.$router.push({name: 'login'});
                location.reload()
              } else {
                this.isLoading = false
              }
            }).catch(() => {
              this.isLoading = false
            })
          } else {
            return false;
          }
        })
      },
      // 取消
      cancel() {
        this.resetForm();
      },
      // 重置表单
      resetForm() {
        this.passwordDialogVisible = false;
        this.$refs['form'].resetFields();
        for (let key in this.form) {
          this.form[key] = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
