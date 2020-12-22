// miniprogram/pages/addGoods/addGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips:false,
    goodsName:"",
    goodsPrince:0,
    goodsComponents:"",
    goodsType:"",

    types:["主食","菜品","饮品"],
    typeIndex:0,

    formData: {

    },

    rules:[{
      name:"goodsname",
      rules:{required:true,message:'请输入商品名字!'},
    },{
      name:"price",
      rules:[{required:true,message:'请输入商品单价!'},{
        validator:(rules,value,param,models)=>{
          if (!/^[0-9]+$/.test(value)) {
            return "商品价格不是有效的数字,有效范围0~999999之间"
          }
        }
      }]
    },{
      name:"content",
      rules:{required:true,message:'请输入配料成分!'},
    },
    ]
  },
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
},

goodsTypeChange: function(e) {
  console.log('picker goods_types 发生选择改变，携带值为', e.detail.value);

  this.setData({
      typeIndex: e.detail.value
  })
},
submitForm() {
  this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
          const firstError = Object.keys(errors)
          if (firstError.length) {
              this.setData({
                  error: errors[firstError[0]].message
              })

          }
      } else {
          wx.showToast({
              title: '校验通过'
          })
          console.log(this.data.formData)
      }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})