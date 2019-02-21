//index.js
/**
 * 用户个人中心界面
 * 打开时根据是否登录显示对应画面
 */
const app = getApp()

Page({
  data: {
    userInfo: {},                                               //用户授权信息    加载时赋值
    hasUserInfo: false,                                        //授权赋值标记    默认false，加载过程中进行判断重赋值
    canIUse: wx.canIUse('button.open-type.getUserInfo'),   //调用接口判断是否拥有授权
    domain:'',                                                 //域名            加载时赋值
    uid:"",                                                    //使用者UID        授权时赋值
    // cur_cursor:0
  },
  onLoad: function () {
    let _this = this;
    //加载时判断小程序授权情况
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
    //将全局变量复制到该页面
    if(app.globalData.domain){
        _this.data.domain = app.globalData.domain;
    }
    //判断是否拥有uid
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
    /**
     * 获取用户授权情况
     * @param e
     */
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    this.getUID();
  },
    /**
     * 获取用户UID
     * 当用户授权时，也需要调用该接口将用户注册到数据库
     */
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
    /**
     * 个人据点
     * 点击时跳转到自己的物品管理页面
     */
  myShop: function(){
      let _this = this;
      //如果本页面不存在uid则去缓存取，如果缓存没有则不跳转
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
