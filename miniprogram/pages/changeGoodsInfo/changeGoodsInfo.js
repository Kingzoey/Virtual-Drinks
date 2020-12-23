// miniprogram/pages/changeGoodsInfo/changeGoodsInfo.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    currentGoodsID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsInfo()
    this.slideButtonInit()
    db.collection('goods')
    .watch({
      onChange:res=>{
        console.log(res.docs)
        this.setData({
          goods:res.docs
        })
      },
      onError:err=>{
        console.log(err)
      }
    })
  },

  //从数据库获取商品信息
  getGoodsInfo: function () {
    wx.showLoading({
      title: '读取信息',
    })
    db.collection('goods').get({
      success: res => {
        this.setData({
          goods: res.data
        })
        console.log(this.data.goods)
        wx.hideLoading()
      }
    })
  },

  //左滑显示
  slideButtonInit: function () {
    this.setData({
      slideButtons: [{
        text: '查看',
      }, {
        text: '修改',
        src: '', // icon的路径
      }, {
        type: 'warn',
        text: '删除',
        src: '', // icon的路径
      }],
    })
  },

  //实现左滑功能
  slideButtonTap: function (e) {
    console.log('slide button tap', e.currentTarget.dataset.id)
    this.setData({
      currentGoodsID: e.currentTarget.dataset.id
    })
    const index = e.detail.index
    if (index == 0) {

    } else if (index == 1) {

    } else if (index == 2) {
      this.setData({
        dialogShow: true
      })
      this.tapDialogButton()
    }
  },

  //删除功能实现
  tapDialogButton(e) {
    console.log(e)
    if (e.detail.index == 1) {
      this.setData({
        dialogShow:false
      })
      wx.showLoading({
        title: '正在删除',
      })
      console.log('当前id:' + this.data.currentGoodsID)
      db.collection('goods').doc(this.data.currentGoodsID).remove().then(res=>{
        console.log(res)
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '商品删除成功!',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }, 1000)
    } else {
      
    }


  },
  onReady: function () {
 
  },
  onShow:function(){
    this.setData({
      goods:[]
    })
  }


})