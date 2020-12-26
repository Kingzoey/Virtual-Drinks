// index/details.js
const db = wx.cloud.database()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onQuery: function () {
    const _this = this;
    const db = wx.cloud.database()
    db.collection('goods').get({
      success: res => {
        _this.setData({
          goods: res.data[0].goods
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery();
  },
})