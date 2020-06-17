Component({
  data: {
    selected: 0,
    tags: [0, 0, 0, 0, 0],
    borderStyle: 'black',
    color: '#999999',
    selectedColor: '#26C78D',
    list: [
      {
        pagePath: '/pages/index/index',
        iconPath: '/static/tabbar/find.png',
        selectedIconPath: '/static/tabbar/find-a.png',
        text: '发现'
      },
      {
        pagePath: '/pages/support/ImList',
        iconPath: '/static/tabbar/notify.png',
        selectedIconPath: '/static/tabbar/notify-a.png',
        text: '消息'
      },
      {
        pagePath: '/pages/user/Praise',
        iconPath: '/static/tabbar/praise.png',
        selectedIconPath: '/static/tabbar/praise.png',
        text: '好评'
      },
      {
        pagePath: '/pages/order/ShoppingCart',
        iconPath: '/static/tabbar/cart.png',
        selectedIconPath: '/static/tabbar/cart-a.png',
        text: '购物车'
      },
      {
        pagePath: '/pages/user/index',
        iconPath: '/static/tabbar/user.png',
        selectedIconPath: '/static/tabbar/user-a.png',
        text: '我的'
      }
    ]
  },
  attached () {

  },
  ready () {
    // console.log(this.data.tags)
  },
  methods: {
    switchTab (e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(e,url,data)
      this.setData({
        selected: data.index
      })
      wx.switchTab({ url })
    }
  }
})
