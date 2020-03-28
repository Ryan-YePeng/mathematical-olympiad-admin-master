<template>
  <div class="error" v-title :data-title="404">
    <div id="flex-container" :style="{ height: screenHeight + 'px' }">
      <div class="main-w3layouts">
        <h1>页面丢失</h1>
        <div class="main-agile">
          <h2>ERROR 404</h2>
          <p></p>
          <div class="botton-w3ls">
            <a @click="jump" style="text-decoration: none">返回上一页</a>
          </div>
        </div>
        <div class="footer-w3l">
          <p class="agileinfo">&copy; 小学奥数网站管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: window.innerHeight // 屏幕高度
    };
  },
  watch: {
    screenHeight: function(val) {
      // 监听屏幕高度变化
      var oIframe = document.getElementById("flex-container");
      oIframe.style.height = Number(val) + "px"; // '120'是页面布局调整，可去除
    }
  },
  methods: {
    jump() {
      this.flag === true
        ? this.$router.go(-1)
        : this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.jpg") no-repeat center fixed;
  background-size: cover;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  position: absolute;
  user-select: none;

  .lizi {
    z-index: 99;
  }

  .main-w3layouts {
    position: absolute;
    top: 0;
    left: 19%;
  }

  .main-agile h2 {
    font-size: 5em;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #fff;
    font-weight: 600;
    text-shadow: 1px 1px 2px #000;
  }

  .main-agile {
    margin: 5em 0 7em;
  }

  .main-agile p {
    color: #fff;
    width: 59%;
    text-align: center;
    margin: 2em auto 1.5em;
    line-height: 30px;
    font-size: 1.1em;
    font-weight: 200;
    letter-spacing: 2px;
  }

  .content-wthree {
    padding: 50px 50px;
    text-align: center;
    position: relative;
  }

  .main-w3layouts h1 {
    color: #fffbf0;
    font-size: 5em;
    letter-spacing: 0px;
    text-align: center;
    font-weight: 500;
    margin: 1em 0 0.5em;
    text-transform: capitalize;
  }

  .botton-w3ls {
    text-align: center;
  }

  .botton-w3ls a {
    cursor: pointer;
    color: #fff;
    font-size: 13px;
    letter-spacing: 1px;
    font-weight: 500;
    padding: 12px 35px;
    text-transform: uppercase;
    background: #ff4c4c;
    display: inline-block;
    border: 2px solid #ff4c4c;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    -o-border-radius: 25px;
    -ms-border-radius: 25px;
    transition: all 0.7s ease-in-out;
    -webkit-transition: all 0.7s ease-in-out;
    -moz-transition: all 0.7s ease-in-out;
    -o-transition: all 0.7s ease-in-out;
    -ms-transition: all 0.7s ease-in-out;
  }

  .botton-w3ls a:hover {
    color: #000;
    background: #fff;
    border: 2px solid #fff;
    transition: all 0.7s ease-in-out;
    -webkit-transition: all 0.7s ease-in-out;
    -moz-transition: all 0.7s ease-in-out;
    -o-transition: all 0.7s ease-in-out;
    -ms-transition: all 0.7s ease-in-out;
  }

  .wthree-text a {
    color: #fff;
    font-size: 13px;
    display: inline;
    letter-spacing: 1px;
    text-transform: capitalize;
  }

  .footer-w3l p {
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color: #eee;
    letter-spacing: 2px;
    line-height: 27px;
  }

  .footer-w3l p a {
    color: #fff;
  }

  .footer-w3l p a:hover {
    text-decoration: underline;
  }

  @media (max-width: 1600px) {
  }
  @media (max-width: 1440px) {
    .main-w3layouts h1 {
      font-size: 5em;
      margin: 0.5em 0 0em;
    }
    .main-agile {
      margin: 4em 0 5em;
    }
    .main-agile h2 {
      font-size: 4em;
    }
    .main-w3layouts {
      left: 17%;
    }
  }
  @media (max-width: 1366px) {
    .main-w3layouts {
      left: 15%;
    }
  }
  @media (max-width: 1280px) {
    .main-w3layouts {
      left: 13%;
    }
  }
  @media (max-width: 1080px) {
    .main-w3layouts h1 {
      font-size: 4.2em;
      margin: 0.7em 0 0em;
    }
    .main-agile h2 {
      font-size: 3.8em;
    }
    .main-w3layouts {
      left: 6%;
    }
  }
  @media (max-width: 1050px) {
    .main-w3layouts {
      left: 4%;
    }
  }
  @media (max-width: 1024px) {
    .main-w3layouts h1 {
      font-size: 4.2em;
      margin: 1.2em 0 0em;
    }
  }
  @media (max-width: 991px) {
    .main-w3layouts h1 {
      font-size: 4em;
      margin: 1em 0 0em;
    }
    .main-w3layouts {
      left: 0%;
    }
  }
  @media (max-width: 900px) {
  }
  @media (max-width: 800px) {
    .main-w3layouts h1 {
      font-size: 3.5em;
      margin: 1.5em 0 0em;
    }
    .main-agile h2 {
      font-size: 3.4em;
    }
    .main-agile p {
      width: 66%;
      font-size: 1em;
    }
    .main-agile {
      margin: 4em 0 4em;
    }
    .footer-w3l p {
      font-size: 13px;
    }
  }
  @media (max-width: 768px) {
    .main-w3layouts h1 {
      margin: 3em 0 0em;
    }
  }
  @media (max-width: 767px) {
    .main-w3layouts h1 {
      font-size: 3.4em;
      margin: 1.5em 0 0em;
    }
  }
  @media (max-width: 736px) {
  }
  @media (max-width: 667px) {
    .main-agile p {
      width: 80%;
    }
  }
  @media (max-width: 640px) {
    .footer-w3l p {
      letter-spacing: 1.5px;
    }
    .footer-w3l p {
      padding: 0 2em;
      line-height: 33px;
    }
  }
  @media (max-width: 600px) {
  }
  @media (max-width: 568px) {
    .main-agile p {
      width: 85%;
    }
  }
  @media (max-width: 480px) {
    .main-w3layouts h1 {
      font-size: 2.8em;
    }
    .main-agile h2 {
      font-size: 3em;
    }
    .main-agile p {
      width: 90%;
      font-size: 14px;
      margin: 2em auto 3.5em;
    }
  }
  @media (max-width: 440px) {
    .main-agile p {
      letter-spacing: 1px;
    }
    .main-agile {
      margin: 4em 0 3em;
    }
  }
  @media (max-width: 414px) {
    .main-agile {
      margin: 5em 0 6em;
    }
    .main-w3layouts h1 {
      font-size: 2.6em;
    }
    .main-agile h2 {
      font-size: 2.7em;
    }
  }
  @media (max-width: 384px) {
    .main-w3layouts h1 {
      font-size: 2.3em;
    }
    .main-agile h2 {
      font-size: 2.4em;
    }
    .botton-w3ls a {
      font-size: 12px;
      padding: 9px 30px;
    }
    .main-agile p {
      letter-spacing: 0.6px;
    }
  }
  @media (max-width: 375px) {
    .main-agile p {
      width: 84%;
      margin: 2em auto 3em;
    }
    .main-agile {
      margin: 5em 0 5em;
    }
  }
  @media (max-width: 320px) {
    .main-w3layouts h1 {
      font-size: 2em;
    }
    .main-agile h2 {
      font-size: 1.5em;
    }
    .main-agile {
      margin: 3em 0 3em;
    }
    .footer-w3l p {
      padding: 0 1em;
      line-height: 26px;
      letter-spacing: 1px;
    }
    .main-agile p {
      margin: 2em auto 2em;
      font-size: 13px;
    }
  }
}
</style>
