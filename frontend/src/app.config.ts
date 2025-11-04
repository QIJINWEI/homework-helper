export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/camera/index',
    'pages/question/list/index',
    'pages/question/detail/index',
    'pages/question/edit/index',
    'pages/collection/list/index',
    'pages/collection/detail/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '智能作业助手',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666',
    selectedColor: '#6190E8',
    backgroundColor: '#fafafa',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'assets/images/tab/home.png',
        selectedIconPath: 'assets/images/tab/home-active.png',
        text: '首页'
      },
      {
        pagePath: 'pages/question/list/index',
        iconPath: 'assets/images/tab/question.png',
        selectedIconPath: 'assets/images/tab/question-active.png',
        text: '题库'
      },
      {
        pagePath: 'pages/collection/list/index',
        iconPath: 'assets/images/tab/collection.png',
        selectedIconPath: 'assets/images/tab/collection-active.png',
        text: '收藏'
      },
      {
        pagePath: 'pages/profile/index',
        iconPath: 'assets/images/tab/profile.png',
        selectedIconPath: 'assets/images/tab/profile-active.png',
        text: '我的'
      }
    ]
  }
})