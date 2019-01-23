//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pic:'/resources/aim.svg',
    domain:'',
    uid:"",
    cur_cursor:0
  },
  onLoad: function () {
      let _this = this;
    if (app.globalData.userInfo) {
        _this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (_this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
          _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
            _this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if(app.globalData.domain){
        _this.data.domain = app.globalData.domain;
    }

    if(_this.data.userInfo.uid){
        console.log("uid:",_this.data.userInfo.uid);
    }else{
        wx.getStorage({
          key: 'uid',
          success: res => {
              _this.data.userInfo.uid = res.data;
          },
          fail:res =>{
              _this.getUID();
          }
        });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.getUID();
  },
    getUID:function(){
      let _this = this;
        wx.login({
            success:res =>{
                wx.request({
                    url:_this.data.domain + "/Index/user/login",
                    method:'POST',
                    data:{
                        code:res.code,
                        userInfo:app.globalData.userInfo
                    },
                    success:(res)=>{
                        //获取uid,并将uid保存到全局
                        if(res.data.status == 1){
                            wx.setStorage({
                                key:"uid",
                                data:res.data.message.uid,
                                success:()=>{
                                    console.log("本地缓存uid成功");
                                },
                                fail:()=>{
                                    console.log("缓存本地失败");
                                }
                            });
                        }else{
                            console.log(res);//登录错误
                        }
                    }
                });
            }
        });
    },
  myShop: function(){
      let _this = this;
      if(!_this.data.uid){
          wx.getStorage({
              key:'uid',
              success:res=>{
                  _this.data.uid = res.data;
                  wx.navigateTo({
                      url: "/pages/manor/manor?uid=" + _this.data.uid
                  });
              }
          })
      }else{
          wx.navigateTo({
              url: "/pages/manor/manor?uid=" + _this.data.uid
          });
      }


  },
})
