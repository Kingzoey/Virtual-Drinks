// miniprogram/pages/addGoods/addGoods.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips:false,
    goodsName:"",
    goodsPrice:0,
    goodsComponents:"",
    goodsType:"",
    goodsInfo:"",

    types:["饮品","菜品","主食"],
    typeIndex:0,

    formData: {

    },

    picFiles:[{url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
  }, {
      loading: true
  }, {
      error: true}],

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
  // 表单输入检测并获取到 formData
  getGoodsName(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
        [`formData.${field}`]: e.detail.value,
        goodsName:e.detail.value
    })
},
getGoodsPrice(e) {
  const {field} = e.currentTarget.dataset
  this.setData({
      [`formData.${field}`]: e.detail.value,
      goodsPrice:e.detail.value
  })
},
getGoodsComponents(e) {
  const {field} = e.currentTarget.dataset
  this.setData({
      [`formData.${field}`]: e.detail.value,
      goodsComponents:e.detail.value
  })
},
// 获取商品类型
goodsTypeChange: function(e) {
  this.setData({
    typeIndex: e.detail.value
})
  console.log('picker goods_types 发生选择改变，携带值为', e.detail.value);

},
// 获取商品简介
getGoodsInfo: function(e) {
	this.setData({
	  goodsInfo:e.detail.value
	}) 
}, 

//上传数据库？
addToDB() {
  db.collection('goods').add({
    data:{
      goodsName:this.data.goodsName,
      goodsPrice:this.data.goodsPrice,
      goodsComponents:this.data.goodsComponents,
      goodsInfo:this.data.goodsInfo,
      goodsType:this.data.types[this.data.typeIndex]
    },
    success:res=>{
      console.log(res)
      wx.showToast({
        title: '成功！',
      })
    }
  })
},

// 点击按钮 提交表单
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
            title: '发布成功'
        })
        this.addToDB()
          
      }
  })
},
// 图片上传处理
selectFile(files) {
  console.log('files', files)
  // 返回false可以阻止某次文件上传
},
uploadFile(files) {
  console.log('upload files', files)
  // 文件上传的函数，返回一个promise
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('some error')
      }, 1000)
  })
},
uploadError(e) {
  console.log('upload error', e.detail)
},
uploadSuccess(e) {
  console.log('upload success', e.detail)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})