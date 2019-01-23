//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      domain:'',
      uid:'',
      type:''
  },
  onLoad: function (options) {
    let {uid,type} = options;
    let _this = this;
    _this.setData({uid,type});

    if(_this.data.domain == ""){
        _this.data.domain = app.globalData.domain;
    }
  },
  submit:function(e){
    let _this = this;
    let data = e.detail.value;
    data['uid'] = _this.data.uid;
    data['type'] = _this.data.type;
    wx.request({
        url:_this.data.domain + "/Index/user/addPoint",
        method:"post",
        data:{data:data},
        success:res=>{
          console.log(res);
        },
        faild:function(){}
    });
  }
})
