//home.js
/**
 * home
 * 首页
 * 主体为一个地图组件
 * 打开时显示用户所处位置
 * 可通过搜索查找对应的物品位置信息
 */
//获取应用实例
const app = getApp();
let amap = require("../../lib/amap");

Page({
    data: {
        longi:'113',
        lati:'23',
        coverImage:'/resources/aim2.png',
        markers: [{
          id: 1,
          iconPath: '/resources/target_blue.png',
          latitude: 23.099994,
          longitude: 113.324520,
          width: '56rpx',
          height: '56rpx'
        }],
    },
    //事件处理函数
    bindViewTap: function() {
    },
    onLoad: function () {
        this.initialize();
        this.wxmap = wx.createMapContext("wxmap");

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
