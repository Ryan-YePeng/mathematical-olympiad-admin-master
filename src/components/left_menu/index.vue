<template>
  <el-scrollbar style="height:100%; background-color: #2f4055" v-show="!isSmall">
    <el-menu
            :default-active="active"
            mode="vertical"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#2f4055"
            active-text-color="#429ee2"
            text-color="#becad8"
            :unique-opened="true"
    >
      <template v-for="item in menuList">
        <!--一级菜单X-->
        <el-menu-item v-if="!item.children || item.children.length===0" :index="item.name"
                      @click="jump($event, item.path)">
          <svg-icon className="svgMenu" :icon-class="item.icon"/>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <!--一级菜单O-->
        <el-submenu v-if="item.children && item.children.length!==0" :key="item.name" :index="item.name">
          <template slot="title">
            <svg-icon className="svgMenu" :icon-class="item.icon"/>
            <span slot="title">{{item.name}}</span>
          </template>
          <template v-for="citem in item.children">
            <!--二级菜单X-->
            <el-menu-item v-if="!citem.children || citem.children.length===0" :index='citem.name' :key="citem.name"
                          @click="jump($event, citem.path)">
              <svg-icon className="svgMenu" :icon-class="citem.icon"/>
              <span slot="title">{{citem.name}}</span>
            </el-menu-item>
            <!--二级菜单O-->
            <el-submenu v-if="citem.children && citem.children.length!==0" :key="citem.name" :index="citem.name">
              <template slot="title">
                <svg-icon className="svgMenu" :icon-class="citem.icon"/>
                <span slot="title">{{citem.name}}</span>
              </template>
              <!--三级菜单X-->
              <el-menu-item v-if="!titem.children || titem.children.length===0" v-for="titem in citem.children"
                            :key="titem.name"
                            :index='titem.name' @click="jump($event, titem.path)">
                <svg-icon className="svgMenu" :icon-class="titem.icon"/>
                <span slot="title">{{titem.name}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import ScrollPane from "../scrollpane/index";

  export default {
    components: {ScrollPane},
    props: ['isCollapse', 'isSmall', 'isMenuCollapse'],
    computed: {
      //获取菜单
      'menuList': function () {
        return this.$store.getters.menu
      },
      //获取当前激活菜单
      'active': function () {
        return this.$store.getters.active
      }
    },
    methods: {
      jump(e, path) {
        if (!this.$route.path.endsWith(path)) {
          // 改变面包屑
          this.$store.dispatch('setBreadcrumb', e.indexPath);
          // 添加tags
          this.$store.dispatch('addTags', {title: e.index, path: path, index: e.indexPath});
          // 改变当前激活菜单
          this.$store.dispatch('setActive', e.index);
          this.$router.push({name: path});
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .iconfont {
    font-size: 20px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 208px;
  }

  .el-menu {
    border: 0;
  }

  .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;
  }

  .el-submenu .el-menu-item:hover {
    background-color: #263445 !important;
  }

  a {
    text-decoration: none;
  }

  .runLogo {
    padding: 20px 20px 10px;
    color: rgb(190, 202, 216);
    background-color: rgb(47, 64, 85);
  }

  .logo {
    position: relative;
    margin-top: 10px;
    text-align: center;
  }

  .logo > img {
    position: relative;
    margin: 0 auto;
    width: 65%;
    height: 38px;
  }

  .v-leave-active {
    transition: all .4s ease;
  }
</style>

