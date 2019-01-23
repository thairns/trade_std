//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    shop:{},
    domain:'',
    goods:[]
  },
  onLoad: function (options) {
    options['uid'] = "1";
    let _this = this;
    if(_this.data.domain == ""){
        _this.data.domain = app.globalData.domain;
    }
    //请求manor信息
      /*
    wx.request({
      url:_this.data.domain + "/Index/user/home?uid=" + options.uid,
      method:"get",
      success:res=>{
        if(res.data.status == 1){             //成功取得
        }
        else if(res.data.status == -1) {    //尚未创建manor
          wx.showModal({
            title: '提示',
            content: '尚未创建个人据点，是否创建？',
            success: res=>{
              if (res.confirm) {           //跳转创建
                wx.navigateTo({
                    url:"/pages/point/point?uid=" +options.uid+"&type=add"
                });
              }else if(res.cancel){        //返回上一页
                wx.navigateBack();
              }
            }
          });
        }
      }
    })
      */
  },
    add:function(){
      console.log("hello");
    }
})
