//home.js
//获取应用实例
const app = getApp()

Page({
    data: {
    motto: 'Hello World',
      markers: [{
          iconPath: '/resources/others.png',
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 50,
          height: 50
      }],
      polyline: [{
          points: [{
              longitude: 113.3245211,
              latitude: 23.10229
          }, {
              longitude: 113.324520,
              latitude: 23.21229
          }],
          color: '#FF0000DD',
          width: 2,
          dottedLine: true
      }],
      controls: [{
          id: 1,
          iconPath: '/resources/location.png',
          position: {
              left: 0,
              top: 300 - 50,
              width: 50,
              height: 50
          },
          clickable: true
      }],
    },
    //事件处理函数
    bindViewTap: function() {
    },
    onLoad: function () {
        //获取首页信息
        wx.request({
            url:"https://www.thairns.com/test.php",
            method:"post",
            dataType:"json",
            data:{},
            success:(res)=>{
              console.log(res);
            },
            fail:(res)=>{
                console.log(res);
            }
        });
    },
    getUserInfo: function(e) {
    },
    regionchange(e) {
        console.log(e.type)
    },
    markertap(e) {
        console.log(e.markerId)
    },
    controltap(e) {
        console.log(e.controlId)
        wx.openLocation({
            latitude: 23.362490,
            longitude: 116.715790,
            scale: 18,
            name: '华乾大厦',
            address:'金平区长平路93号'
        })

    }
})
