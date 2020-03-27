<template>
  <div class="index" ref="index" id="index" v-title data-title="小学奥数网站管理系统">
    <el-container>
      <LeftMenu :isCollapse="isCollapse" :isSmall="isSmall"></LeftMenu>
      <Drawer :display.sync="isMenuCollapse" :inner="true" :width="'209px'">
        <LeftMenu :isCollapse="false" :isSmall="false"></LeftMenu>
      </Drawer>
      <el-container>
        <el-header style="height: 50px;">
          <div class="navbar">
            <div class="menu-button">
              <el-tooltip class="item" effect="dark" :content="isCollapse ? '展开菜单' : '收起菜单'" placement="bottom">
                <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="showMenu"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除所有标签页" placement="bottom">
                <i class="el-icon-circle-close" @click="removeAllTags" title="删除所有标签页"></i>
              </el-tooltip>
            </div>
            <div class="breadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>
            <el-dropdown trigger="click" style="cursor: pointer">
              <div class="avatar-box">
                <el-avatar shape="square" :size="45">
                  <img src="../assets/admin.jpg" alt="头像"/>
                </el-avatar>
                <i class="el-icon-caret-bottom el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="navigateTo('person')">个人中心</el-dropdown-item>
                  <div class="line"></div>
                  <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </div>
            </el-dropdown>
          </div>
          <div class="border" style="border-color: #f0f0f0"></div>
        </el-header>
        <div class="tabs">
          <Tag @reload="reloadRouter"></Tag>
        </div>
        <el-main class="top" id="top" style="overflow-x: hidden">
          <transition name="xz-animation">
            <keep-alive
                    v-if="isRouterAlive"
                    include="Order,Courier,Site,Help,Classification">
              <router-view></router-view>
            </keep-alive>
          </transition>
          <div class="back-top">
            <el-button type="primary" icon="el-icon-top" circle class="to-top" @click="backTop" v-show="isShowBackTop"/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Breadcrumb from '../components/breadcrumb/index'
  import Tag from '../components/tag/index'
  import LeftMenu from '../components/left_menu/index'
  import Drawer from '../components/drawer/index'

  export default {
    name: 'index',
    components: {Breadcrumb, Tag, LeftMenu, Drawer},
    data() {
      return {
        isRouterAlive: true,
        isCollapse: false,
        isSmall: false,
        isMenuCollapse: false,
        isShowBackTop: false
      }
    },
    mounted() {
      // 监听
      this.initialListener();
      // 获取视窗大小
      this.getWindowWidth()
    },
    computed: {
      'active': function () {
        return this.$store.getters.active
      },
      user() {
        return this.$store.getters.user
      }
    },
    watch: {
      active() {
        this.isMenuCollapse = false
      }
    },
    methods: {
      // 获取滚动高度
      getScrollTop(obj) {
        obj.scrollTop >= 100
            ? this.isShowBackTop = true
            : this.isShowBackTop = false;
        this.$store.dispatch('setScrollTop', obj.scrollTop)
      },
      // 事件监听
      initialListener() {
        const _this = this;
        window.addEventListener('resize', () => {
          this.getWindowWidth()
        });
        document.querySelector('.top').addEventListener('scroll', function () {
          _this.getScrollTop(this)
        })
      },
      // 返回顶部
      backTop(delay = 500) {
        this.$$('.top').animate({scrollTop: 0}, delay)
      },
      // 退出登录
      logout() {
        this.$msgBox('确定注销并退出系统吗？', 'warning').then(() => {
          // 清除缓存
          this.$removeLocalStorage('MathematicalOlympiadUser');
          this.$removeCookiesStorage('MathematicalOlympiadToken');
          this.$removeSessionStorage('MathematicalOlympiadLayout');
          this.$router.push({name: 'login'});
          location.reload()
        })
      },
      // 移除所有标签
      removeAllTags() {
        // 清空面包屑
        this.$store.dispatch('setBreadcrumb', null);
        // 清空标签
        this.$store.dispatch('setTags', null);
        // 改变激活菜单
        this.$store.dispatch('setActive', '首页');
        this.$router.push({name: 'home'});
      },
      // 跳转路由
      navigateTo(path) {
        if (this.$route.path.endsWith('person')) return;
        // 改变面包屑
        this.$store.dispatch('setBreadcrumb', ['个人中心']);
        // 添加tags
        this.$store.dispatch('addTags', {title: '个人中心', path: 'person', index: ['个人中心']});
        // 改变当前激活菜单
        this.$store.dispatch('setActive', '个人中心');
        // 跳转
        this.$router.push({name: path})
      },
      // 获取屏幕宽度
      getWindowWidth() {
        if (window.innerWidth < 1100) {
          this.isSmall = true;
          this.isCollapse = true
        } else {
          this.isSmall = false;
          this.isMenuCollapse = false
        }
      },
      // 显示菜单
      showMenu() {
        if (this.isSmall) {
          this.isMenuCollapse = !this.isMenuCollapse
        } else {
          this.isCollapse = !this.isCollapse
        }
      },
      // 刷新子路由
      reloadRouter() {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style lang="scss">
  .index {
    position: relative;
    height: 100%;
    background: #eef0f3;

    .el-avatar > img {
      width: 100%;
    }

    .el-container {
      position: relative;
      height: 100%;
    }

    .el-header {
      position: relative;
      background: #fefefe;
      padding: 0;
    }

    .navbar {
      position: relative;
      line-height: 50px;
      box-shadow: 0 2px 2px rgb(230, 230, 230);
    }

    .menu-button {
      position: relative;
      display: inline-block;
      margin-left: 1rem;
      height: 50px;
      line-height: 50px;
      font-size: 1.5rem;
      color: #686868;
      transition: .3s;
      cursor: pointer;
    }

    .breadcrumb {
      position: absolute;
      left: 100px;
      top: 21px;
    }

    .el-icon-s-unfold, .el-icon-circle-close {
      transition: .3s;
    }

    .el-icon-s-unfold:active {
      color: rgb(19, 180, 255);
    }

    .el-icon-circle-close {
      position: relative;
      margin-left: .8rem;
    }

    .el-icon-circle-close:active {
      color: rgb(19, 180, 255);
    }

    .el-dropdown {
      position: absolute;
      top: 2px;
      right: 0;
      width: 60px;
      height: 50px;
    }

    .line {
      position: relative;
      height: 0;
      border: 1px solid #eee;
    }

    .tabs {
      position: relative;
      background: #ffffff;
    }

    .el-icon-caret-bottom {
      position: absolute;
      right: 0;
      bottom: 3px;
    }

    .back-top {
      position: fixed;
      z-index: 1500;
      right: 20px;
      bottom: 100px;
    }

    .xz-animation-enter-active {
      transition: all .5s .6s;
    }

    .xz-animation-leave-active {
      transition: all .5s;
    }

    .xz-animation-enter {
      transform: translateX(-30px);
      opacity: 0;
    }

    .xz-animation-leave-to {
      transform: translateX(30px);
      opacity: 0;
    }
  }
</style>
