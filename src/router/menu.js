module.exports = {
  /**
   * @description level后台管理系统菜单
   */
  menu: [
    {
      name: "题库管理",
      icon: "question_bank",
      path: "question_bank",
      component: "question_bank",
      hidden: false,
      children: [
        {
          name: "选择",
          icon: "choice",
          path: "choice",
          component: "choice",
          hidden: false,
          children: []
        },
        {
          name: "填空",
          icon: "subjective",
          path: "subjective",
          component: "subjective",
          hidden: false,
          children: []
        }
      ]
    },
    {
      name: "视频管理",
      icon: "video",
      path: "video",
      component: "video",
      hidden: false,
      children: [
        {
          name: "视屏列表",
          icon: "video_list",
          path: "video_list",
          component: "video_list",
          hidden: false,
          children: []
        },
        {
          name: "评论管理",
          icon: "question",
          path: "question",
          component: "question",
          hidden: true,
          children: []
        },
        {
          name: "提问列表",
          icon: "consult",
          path: "consult",
          component: "consult",
          hidden: false,
          children: []
        }
      ]
    },
    {
      name: "用户管理",
      icon: "user",
      path: "user",
      component: "user",
      hidden: false,
      children: []
    },
    {
      name: "信息反馈",
      icon: "feedback",
      path: "feedback",
      component: "feedback",
      hidden: false,
      children: []
    }
  ]
};
