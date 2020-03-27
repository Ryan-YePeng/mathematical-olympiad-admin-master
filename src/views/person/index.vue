<template>
  <div class="person">
    <el-card class="box-card" style="width: 70%;margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div style="text-align: center; margin-bottom: 20px">
        <el-avatar shape="circle" :size="120">
          <img src="../../assets/admin.jpg" alt="头像"/>
        </el-avatar>
      </div>
      <ul class="personInfo">
        <li>
          <span>账号</span>
          <span>{{user.username}}</span>
        </li>
        <li>
          <span>昵称</span>
          <span>{{user.nickname}}</span>
        </li>
        <li>
          <span>权限</span>
          <span>管理员</span>
        </li>
        <li>
          <span>创建时间</span>
          <span>{{user.user_time | formatDateTime}}</span>
        </li>
        <li>
          <span>安全设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
          </span>
        </li>
      </ul>
    </el-card>
    <password-dialog ref="PasswordDialog"></password-dialog>
  </div>
</template>

<script>
  import PasswordDialog from './passwordDialog'

  export default {
    components: {PasswordDialog},
    name: 'person',
    data() {
      return {
        isLoading: false,
        loading: false,
        logData: []
      }
    },
    computed: {
      'user': function () {
        return this.$store.getters.user
      },
      'level': function () {
        let data = this.$store.getters.user;
        return data.authorities[0]['authority']
      },
      'userId': function () {
        return this.$store.getters.userId
      },
    },
    methods: {
      // 修改密码
      changePassword() {
        const _this = this.$refs.PasswordDialog;
        _this.passwordDialogVisible = true
      },
    }
  }
</script>

<style lang="scss">
  .person {
    .personInfo li {
      border-bottom: 1px solid #f0f3f4;
      border-top: 1px solid #f0f3f4;
      padding: 11px 0;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }

    .el-avatar > img {
      width: 100%;
    }
  }
</style>
