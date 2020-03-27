<template>
  <div>
    <textarea class="tinymce"></textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver'

  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help' // 帮助
  import 'tinymce/plugins/charmap' // 特殊符号
  import 'tinymce/plugins/paste' // 粘贴图片
  import 'tinymce/plugins/hr' // 水平分割线
  import 'tinymce/plugins/searchreplace' // 全屏
  import 'tinymce/plugins/insertdatetime' // 插入时间
  import 'tinymce/plugins/toc' // 内容列表
  import 'tinymce/plugins/codesample' // 插入代码

  import {isEmpty} from "@/utils/common";
  import {uploadFileApi} from '@/api/file'

  export default {
    data() {
      return {
        content: '',
        DefaultInit: {
          language_url: 'assets/tinymce/langs/zh_CN.js',  //导入语言文件
          language: "zh_CN",//语言设置
          skin_url: 'assets/tinymce/skins/ui/oxide',//主题样式
          height: 800, //高度
          menubar: false, // 最上方menu菜单
          toolbar: true, // false禁用工具栏（隐藏工具栏）
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false,  // 禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar: ['bold italic underline strikethrough blockquote | forecolor backcolor|formatselect | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats | removeformat undo redo ',
            'bullist numlist toc pastetext|charmap hr insertdatetime | lists image media table link unlink | searchreplace fullscreen'],
          plugins: 'lists image media table wordcount fullscreen help codesample toc insertdatetime  searchreplace  link charmap paste hr',
        },
      }
    },
    computed: {
      pictureBaseUrl() {
        return process.env.VUE_APP_PICTURE_BASE_API
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 获得富文本内容
      getContent() {
        return tinymce.activeEditor.getContent()
      },
      // 设置富文本内容
      setContent(value) {
        if (isEmpty(value)) {
          tinymce.activeEditor.setContent('')
        } else {
          tinymce.activeEditor.setContent(value)
        }
      },
      init() {
        const _this = this;
        tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure) {
            let data = {};
            data.pic = blobInfo.blob();
            uploadFileApi(data)
                .then(result => {
                  let response = result.data.path;
                  let url = _this.pictureBaseUrl + response;
                  if (result.status === 200) {
                    success(url);
                  } else {
                    failure('上传失败！')
                  }
                })
          },
          // 挂载的DOM对象
          selector: `.tinymce`,
        });
      }
    },
    beforeDestroy() {
      tinymce.remove()
    }
  }
</script>

<style scoped>

</style>
