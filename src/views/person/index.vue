<template>
  <div class="person">
    <el-card class="box-card" style="width: 70%;margin: 0 auto">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div style="text-align: center; margin-bottom: 20px">
        <el-avatar shape="circle" :size="120">
          <img v-if="user.is_special" src="../../assets/special.jpg" alt="头像"/>
          <img v-else-if="level == 'level'" src="../../assets/level.jpg" alt="头像"/>
          <img v-else-if="level == 'level0'" src="../../assets/level0.jpg" alt="头像"/>
          <img v-else-if="level == 'level1'" src="../../assets/level1.jpg" alt="头像"/>
          <img v-else src="../../assets/level2.jpg" alt="头像"/>
        </el-avatar>
      </div>
      <ul class="personInfo">
        <li>
          <span>账号</span>
          <span>{{user.username}}</span>
        </li>
        <li>
          <span>级别</span>
          <span v-if="user.is_special">特殊</span>
          <span v-else-if="level == 'level'">超管</span>
          <span v-else-if="level == 'level0'">总部</span>
          <span v-else-if="level == 'level1'">一级网点</span>
          <span v-else>二级网点</span>
        </li>
        <li>
          <span>网点名称(中)</span>
          <span>{{user.c__branchesName}}</span>
        </li>
        <li>
          <span>联系方式(中)</span>
          <span>{{user.c_br_phone}}</span>
        </li>
        <li>
          <span>地址(中)</span>
          <span>{{user.c_br_address}}</span>
        </li>
        <li>
          <span>网点名称(老挝)</span>
          <span>{{user.l_branchesName}}</span>
        </li>
        <li>
          <span>联系方式(老挝)</span>
          <span>{{user.l_br_phone}}</span>
        </li>
        <li>
          <span>地址(老挝)</span>
          <span>{{user.l_br_address}}</span>
        </li>
        <li>
          <span>安全设置</span>
          <span>
            <a style="color: #317ef3; cursor: pointer" @click="changePassword">修改密码</a>
          </span>
        </li>
      </ul>
    </el-card>
    <password-dialog ref="passwordDialogForm"></password-dialog>
  </div>
</template>

<script>
  import PasswordDialog from './passwordDialog'
  import {getUserApi} from '@/api/person'
  import user from "@/store/modules/user";

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
    mounted() {
      getUserApi(this.userId).then(result => {
        let user = result.data.message;
        this.$store.dispatch('setUser', user);
      });
    },
    methods: {
      // 修改密码
      changePassword() {
        let isCanChangePassword = this.user.u_canupdate;
        if (!isCanChangePassword) {
          this.$warnMsg('您当前能不能修改密码，请联系您的上级部门');
          return
        }
        const _this = this.$refs.passwordDialogForm;
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
