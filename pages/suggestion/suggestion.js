//home.js
//获取应用实例
const app = getApp();
let amap = require("../../lib/amap");

Page({
    data: {
        longi:'113.324520',
        lati:'23.099994',
      coverImage:'/resources/aim2.png',
        markers: [{
          id: 1,
          iconPath: '/resources/target_blue.png',
          latitude: 23.099994,
          longitude: 113.324520,
          width: '56rpx',
          height: '56rpx'
        }],
        wxmap:{}
    },
    //事件处理函数
    bindViewTap: function() {
    },
    onLoad: function () {
        const _this = this;
        _this.initialize();

        app.globalData.wxmap = wx.createMapContext("wxmap");
        _this.wxmap = app.globalData.wxmap;

    },
    getUserInfo: function(e) {
    },
    regionchange(e) {
        if(e.type == 'end') {
            this.wxmap.getCenterLocation({
                success: (res) => {
                    this.setCentre({longitude:res.longitude,latitude:res.latitude});
                }
            });
        }
    },
    markertap(e) {
  
    },
    resetCen:function(){
        this.wxmap.moveToLocation();
        amap.getPoiAround({querykeywords:'美食'}).then(d=>{
            console.log(d);
        })
    },
    initialize:function() {
        wx.getLocation({
            success:(res)=>{
                var coordinate = {
                    longitude:res.longitude,
                    latitude:res.latitude
                };
                this.setScreenCentre(coordinate);
                this.setCentre(coordinate);
            }
        });
    },
    setCentre:function (coordinate) {
        this.setData({
            'markers[0].latitude':coordinate.latitude,
            'markers[0].longitude':coordinate.longitude
        });
    },
    // 屏幕中心坐标设置
    setScreenCentre:function (coordinate) {
        this.setData({
            longi:coordinate.longitude,
            lati:coordinate.latitude,
        });
    }
})
