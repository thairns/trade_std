        //index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      domain:'',
      uid:'',
      type:'',
      thumbnail:[]
  },
    addImg:function(){
      let _this = this;
      wx.chooseImage({
          success:res=>{
              let thumbnail = res.tempFiles;
              // let thumbnail = res.tempFilePaths;
              let len = thumbnail.length;
              let cur = _this.data.thumbnail.length;
              if(cur > 0){
                  if(cur + len > 9){
                      thumbnail.length = 9 - cur;
                  }
                  thumbnail = _this.data.thumbnail.concat(thumbnail);
              }
              _this.setData({thumbnail})
          }
      });
    },
    removeImage:function(e){
      let thumbnail = this.data.thumbnail;
      thumbnail.splice(e.currentTarget.dataset.index,1);
      this.setData({thumbnail});
    },
    previewImage:function(e){
      let _this = this;
      wx.previewImage({
        urls:_this.data.thumbnail,
        current:_this.data.thumbnail[e.currentTarget.dataset.index]
      })
    },

    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
  onLoad: function (options) {
    let _this = this;
    if(_this.data.domain == ""){
        _this.data.domain = app.globalData.domain;
    }
  },
  submit:function(e){
    let _this = this;
    let data = e.detail.value;
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
                      icon:'success'
                    });
                });
            }
        }
    });
  }
})
