// miniprogram/pages/addGoods/addGoods.js
const db = wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    goodsName: "",
    goodsPrice: 0,
    goodsComponents: "",
    goodsType: "",
    goodsInfo: "",

    types: ["饮品", "菜品", "主食"],
    typeIndex: 0,

    formData: {

    },


    files: [],
    filesUrl:"",

    rules: [{
      name: "goodsname",
      rules: {
        required: true,
        message: '请输入商品名字!'
      },
    }, {
      name: "price",
      rules: [{
        required: true,
        message: '请输入商品单价!'
      }, {
        validator: (rules, value, param, models) => {
          if (!/^[0-9]+$/.test(value)) {
            return "商品价格不是有效的数字,有效范围0~999999之间"
          }
        }
      }]
    }, {
      name: "content",
      rules: {
        required: true,
        message: '请输入配料成分!'
      },
    }, ]
  },
  // 表单输入检测并获取到 formData
  getGoodsName(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      goodsName: e.detail.value
    })
  },
  getGoodsPrice(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      goodsPrice: e.detail.value
    })
  },
  getGoodsComponents(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value,
      goodsComponents: e.detail.value
    })
  },
  // 获取商品类型
  goodsTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
    console.log('picker goods_types 发生选择改变，携带值为', e.detail.value);

  },
  // 获取商品简介
  getGoodsInfo: function (e) {
    this.setData({
      goodsInfo: e.detail.value
    })
  },

  //上传数据库？
  addToDB() {
    db.collection('goods').add({
      data: {
        goodsName: this.data.goodsName,
        goodsPrice: this.data.goodsPrice,
        goodsComponents: this.data.goodsComponents,
        goodsInfo: this.data.goodsInfo,
        goodsType: this.data.types[this.data.typeIndex]
      },
      success: res => {
        console.log(res)
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
        this.addImgToDB()
        this.addToDB()
        wx.showToast({
          title: '发布成功'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  // chooseImage: function (e) {
  //   var that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       });
  //     }
  //   })
  // },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  uplaodFile(files) {
    console.log('upload files', files);
    var that = this;
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;
      that.setData({
        filesUrl: tempFilePaths
      })
      const filePath = this.data.filesUrl[0]
      const cloudPath = 'goods-img-'+filePath.match(/\.[^.]+?$/)[0]
      console.log(filePath)
      console.log(cloudPath)
      var object = {};
      object['urls'] = tempFilePaths;
      resolve(object);
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },

  addImgToDB(){
    const filePath = this.data.filesUrl[0]
    const cloudPath = 'goods-img-'+this.data.goodsName+filePath.match(/\.[^.]+?$/)[0]
    console.log(filePath)
    console.log(cloudPath)
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success:res=>{
        console.log('sss')
        wx.showToast({
          title: '图片成功！',
        })
      }
    })
   }
})