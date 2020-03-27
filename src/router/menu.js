module.exports = {
  /**
   * @description level后台管理系统菜单
   */
  menu: [
    {
      "name": "题库管理",
      "icon": "question_bank",
      "path": "question_bank",
      "component": "question_bank",
      "children": []
    },
    {
      "name": "视频管理",
      "icon": "video",
      "path": "video",
      "component": "video",
      "children": []
    },
    {
      "name": "用户管理",
      "icon": "user",
      "path": "user",
      "component": "user",
      "children": []
    },
    {
      "name": "信息反馈",
      "icon": "feedback",
      "path": "feedback",
      "component": "feedback",
      "children": []
    }
  ]
};

