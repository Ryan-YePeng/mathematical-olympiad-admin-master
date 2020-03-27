<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="bread-list">
      <el-breadcrumb-item key="首页">
        <router-link :to="{name: 'home'}"><span @click="jumpToHome">首页</span></router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{item}}</el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  export default {
    computed: {
      // 获取面包屑
      'breadcrumb': function () {
        return this.$store.getters.breadcrumb
      }
    },
    methods: {
      jumpToHome() {
        // 清空面包屑
        this.$store.dispatch('setBreadcrumb', []);
        // 设置激活菜单
        this.$store.dispatch('setActive', '首页');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      cursor: text;
    }
  }

  .el-breadcrumb__item {
    position: relative;
    top: -21px;
    left: -15px;
  }

  .bread-list-enter-active {
    transition: all .5s .6s;
  }

  .bread-list-leave-active {
    transition: all .5s;
  }

  .bread-list-enter {
    transform: translateX(-25px);
    opacity: 0;
  }

  .bread-list-leave-to {
    transform: translateX(25px);
    opacity: 0;
  }
</style>


