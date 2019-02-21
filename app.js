//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },

    upload:function(id,images,index=0){
      let _this = this;
      return new Promise(function(resolve, reject){
              function uploadFiles(id,images,index) {
                  if (images.length <= index) {
                      resolve("success");
                      return;
                  }
                  wx.showLoading({
                      title: "正在上传第" + (index + 1) + "张图片",
                      mask: true,
                      success: res => {
                          wx.uploadFile({
                              url: _this.globalData.domain + "/index/goods/uploadFile",
                              filePath: images[index++]['path'],
                              name: 'file',
                              header: {
                                  "Content-Type": "multipart/form-data"
                              },
                              formData:{id},
                              success: res => {
                                  wx.hideLoading();
                                  console.log(res);
                                  res = JSON.parse(res.data);
                                  if (res.status == 1) {
                                      console.log(res.message);
                                      uploadFiles(id, images, index);
                                  } else {
                                      console.error(res);
                                  }
                              }
                          });
                      }
                  });
              }
              uploadFiles(id,images,index);
          }
      );
    },
  globalData: {
    userInfo: null,
    wxmap:{},
    domain:'https://www.thairns.com/wechat/public/index.php',
    domain_static:'https://www.thairns.com/wechat/public'
  }
});