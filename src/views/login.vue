<template>
  <div class="login" v-title data-title="登录-小学奥数网站管理系统">
    <div id="flex-container">
      <section class="container">
        <el-form ref="loginForm" :model="form" :rules="rules" label-position="left" label-width="0px"
                 class="login-form">
          <el-form-item class="divTitle">
            <h3 class="title">小学奥数网站管理系统</h3></el-form-item>
          <el-form-item prop="username">
            <el-input v-model="form.username" type="text" auto-complete="off" placeholder="账号">
              <svg-icon slot="prefix" icon-class="user"></svg-icon>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" auto-complete="off" placeholder="密码"
                      @keyup.enter.native="submitForm('loginForm')">
              <svg-icon slot="prefix" icon-class="password"></svg-icon>
            </el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <el-button :loading="isLoading" size="medium" type="primary" style="width:100%;"
                       @click.native.prevent="submitForm('loginForm')">
              <span v-if="!isLoading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
  import {login} from '../api/login'
  import {getRouter} from "../router";

  export default {
    name: "Login",
    data() {
      return {
        isLoading: false,
        rememberMe: false,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted() {
      this.form.username = this.$getLocalStorage('username') || '';
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoading = true;
            const data = {};
            data.username = this.form.username;
            data.password = this.form.password;
            login(data)
                .then(result => {
                  const {token} = result.data;
                  const {user} = result.data;
                  this.$store.dispatch('setUser', user);
                  this.$store.dispatch('setUserId', user.u_id);
                  this.$store.dispatch('setToken', `Bearer ${token}`);
                  // 动态拉取路由和菜单
                  return getRouter();
                })
                .then(() => {
                  this.isLoading = false;
                  this.$setLocalStorage('username', this.form.username);
                  this.$router.push({name: 'home'});
                  this.$store.dispatch('setActive', '首页');
                })
                .catch(() => {
                  this.isLoading = false
                })
          } else {
            this.$errorMsg('请输入正确信息！');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 31%, rgba(154, 207, 249, 1) 100%, rgba(154, 207, 249, 1) 100%);
    user-select: none;

    .container {
      position: absolute;
      border-radius: 10px;
      top: 20%;
      left: 33%;
      padding: 25px;
      border: 5px;
      text-align: center;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      z-index: 99;
      background: #fff;
      color: #fff;
    }

    .title {
      text-align: center;
      font-size: 20px;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
      font-weight: bold;
    }

    .login-form {
      width: 300px;
      padding: 25px 25px 5px 25px;
      position: relative;

      .el-input {
        height: 38px;

        input {
          height: 38px;
        }
      }

      .input-icon {
        height: 39px;
        width: 14px;
        margin-left: 2px;
      }
    }

    .divTitle {
      color: rgb(112, 112, 112);
      height: 40px;
    }
  }
</style>
