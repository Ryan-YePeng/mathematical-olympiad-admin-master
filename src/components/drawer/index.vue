<template>
  <div class="drawer">
    <div :class="maskClass" @click="closeByMask"></div>
    <div :class="mainClass" :style="mainStyle" class="main">
      <div class="close-btn" v-show="closable" @click="closeByButton">
        <i class="el-icon-close"></i>
      </div>
      <div class="drawer-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 是否打开
    display: {
      type: Boolean
    },

    // 是否显示关闭按钮
    closable: {
      type: Boolean,
      default: false
    },

    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },

    // 是否点击遮罩关闭
    maskClosable: {
      type: Boolean,
      default: true
    },

    // 宽度
    width: {
      type: String,
      default: "400px"
    },

    // 是否在父级元素中打开
    inner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    maskClass: function() {
      return {
        "mask-show": this.mask && this.display,
        "mask-hide": !(this.mask && this.display),
        inner: this.inner
      };
    },
    mainClass: function() {
      return {
        "main-show": this.display,
        "main-hide": !this.display,
        inner: this.inner
      };
    },
    mainStyle: function() {
      return {
        width: this.width,
        left: this.display ? "0" : `-${this.width}`,
        borderLeft: this.mask ? "none" : "1px solid #eee"
      };
    }
  },
  mounted() {
    if (this.inner) {
      let box = this.$el.parentNode;
      box.style.position = "relative";
    }
  },
  methods: {
    closeByMask() {
      this.maskClosable && this.$emit("update:display", false);
    },
    closeByButton() {
      this.$emit("update:display", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer {
  /* 遮罩 */
  .mask-show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.5s;
  }
  .mask-hide {
    opacity: 0;
    transition: opacity 0.5s;
  }

  /* 滑块 */
  .main {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    background: #fff;
    transition: all 0.5s;
  }
  .main-show {
    opacity: 1;
  }
  .main-hide {
    opacity: 0;
  }

  /* 某个元素内部显示 */
  .inner {
    position: absolute;
  }

  /* 其他样式 */
  .close-btn {
    z-index: 99;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .drawer-body {
    width: 100%;
    height: 100%;
  }
}
</style>
