//index.js
const app = getApp()
// 获取云数据库示例
const db = wx.cloud.database()

Page({
  data: {
    imgUrls:["../../images/index/3.png",
             "../../images/index/2.png",
             "../../images/index/5.png",
             "../../images/index/1.png",
             "../../images/index/4.png",
            ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: "",

    img:[]

  },

  onLoad:function() {
    this.setData({
      img:'cloud://virtual-drinks-4grqmv5j49ec7114.7669-virtual-drinks-4grqmv5j49ec7114-1304492105/index.png'
    })
  }
})
