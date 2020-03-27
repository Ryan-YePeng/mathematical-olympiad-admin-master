<template>
  <div ref="home" class="home" :style="'height:' + mainHeight + 'px'" v-show="isShow">
    <div class="container">
      <h1 class="title minW">小学奥数后台管理系统</h1>
    </div>
  </div>
</template>

<script>
  const elementResizeDetectorMaker = require("element-resize-detector");
  let mainResizeListen = null;
  mainResizeListen = elementResizeDetectorMaker();

  export default {
    name: "Home",
    data() {
      return {
        mainHeight: '',
        isShow: false
      }
    },
    mounted() {
      this.addListen()
    },
    methods: {
      addListen() {
        let home = this.$refs['home'];
        let main = home.parentElement;
        this.mainHeight = main.offsetHeight - 40;
        this.isShow = true;
        mainResizeListen.listenTo(main, () => {
          this.$nextTick(() => {
            this.mainHeight = main.offsetHeight - 40;
          })
        })
      }
    },
    beforeDestroy() {
      let home = this.$refs['home'];
      let main = home.parentElement;
      mainResizeListen.uninstall(main);
    }
  }
</script>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    background: url('../../assets/logisticsBG.png') no-repeat bottom;
    background-size: cover;

    .container {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-top: 100px;
      background-color: rgba(0, 0, 0, 0.7);
      text-align: center;
      color: white;

      .title {
        font-size: 30px;
      }
    }
  }
</style>
