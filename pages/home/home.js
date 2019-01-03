//home.js
//获取应用实例
const app = getApp();
//var amapFile = require('../../lib/amap-wx.js');

Page({
    data: {
        longi:'113.324520',
        lati:'23.099994',
        coverImage:'/resources/aim.svg',
        markers: [{
          iconPath: '/resources/target_blue.svg',
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 25,
          height: 25
        }],
        wxmap:{}
    },
    //事件处理函数
    bindViewTap: function() {
    },
    onLoad: function () {
        const _this = this;
        _this.initialize();
        // var key = "4f2592133b9b0f2f6a19a6d7cdd457fe";
        // var map = new amapFile.AMapWX({key:'高德Key'});
        app.globalData.wxmap = wx.createMapContext("wxmap");
        _this.wxmap = app.globalData.wxmap;
        _this.wxmap.getCenterLocation({
            success:(res)=>{
                console.log(res);
            }
        });

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
        console.log(e);
    },
    resetCen:function(){
        this.wxmap.moveToLocation();
        // this.initialize();
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
