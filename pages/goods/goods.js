//index.js
/**
 * goods
 * 物品页面（添加/修改）
 *
 */
//获取应用实例
const app = getApp()

Page({
  data: {
      domain:'',    //域名，              在加载页面时，从全局变量读取
      manor_id:'',       //进行操作用户ID，     打开该页面时传入
      type:'',      //操作类型，           打开该页面时传入
      thumbnail:[]  //选中图片列表，       选择时加入
  },
    /**
     * 添加图片
     * 点击时得到所选的图片
     * 判断当前图片数量
     * 如果当前已选数量与该次所选数量
     */
    addImg:function(){
      let _this = this;
      wx.chooseImage({
          count:9 - _this.data.thumbnail.length,
          success:res=>{
              let thumbnail = res.tempFiles;
              thumbnail = _this.data.thumbnail.concat(thumbnail);
              _this.setData({thumbnail})
          }
      });
    },
    /**
     * 移除所选图片
     * 当点击红色x时，将图片从thumbnail列表移除
     * @param e 点击事件
     */
    removeImage:function(e){
      let thumbnail = this.data.thumbnail;
      thumbnail.splice(e.currentTarget.dataset.index,1);
      this.setData({thumbnail});
    },

    /**
     * 预览图片
     * 点击图片时通过Index来得到所点图片信息
     * 然后调起微信wx.previewImage函数实现预览
     * @param e 点击事件
     */
    previewImage:function(e){
      let _this = this;
      let thumbnail = _this.data.thumbnail;
      let urls = [];
      thumbnail.forEach(function(i,index){
         urls[index] = i.path;
      });
      wx.previewImage({
        // urls:_this.data.thumbnail,
        urls,
        current:urls[e.currentTarget.dataset.index]
      })
    },

    /**
     * 点击交易类型切换时触发事件
     * Update：点击对应类型时，下方输入进行相应类型调整
     * @param e
     */
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    /**
     * 加载页面时
     * 根据传入值（uid，type）确定操作用户以及对象
     * @param options
     */
  onLoad: function (options) {
    let _this = this;
    if(_this.data.domain == ""){
        _this.data.domain = app.globalData.domain;
    }
    if(!options.manor_id){
        wx.navigateBack();
    }
    if(!options.type){
        options.type = "add";
    }
    _this.setData({
        manor_id:options.manor_id,
        type:options.type
    });
  },
    /**
     * 提交表单
     * 提交时首先将除了图片外的插入数据库，并返回该项ID
     * 将图片集合通过app.js的接口上传
     * 完成后将返回上一页
     * @param e
     */
  submit:function(e){
    let _this = this;
    let data = e.detail.value;
    data['manor_id'] = _this.data.manor_id;
    wx.showLoading({
        title:"上传中...",
        mask:true
    });
    wx.request({
        url:_this.data.domain + "/Index/goods/add",
        method:"post",
        data:{data},
        success:res=>{
            if(res.data.status == 1){
                wx.hideLoading();
                let id = res.data.message;

                app.upload(id,_this.data.thumbnail).then((resolve,reject)=>{
                    wx.showToast({
                      title: '登记成功！',
                      icon:'success',
                        success:()=>{
                          wx.navigateBack();
                        }
                    });
                });
            }
        }
    });
  }
})
