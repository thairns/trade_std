//index.js
/**
 * manor
 * 本页面为用户创建据点
 * 打开页面时传入一个uid
 * 从数据库读取对应的物品列表
 */
//获取应用实例
const app = getApp()

Page({
  data: {
    shop:{},
    domain:'',          //域名          加载时赋值
    goods:[],           //已上架物品     加载时请求赋值
    slide:[],           //物品滑动标记
    uid:'',             //使用者ID       打开页面传入
    startX:"",          //滑块开始滑动位置
    delBtnWidth:180     //滑块按钮宽度·
  },
  onLoad: function (options) {
    let _this = this;
    _this.setData({uid:options.uid});
    _this.data.domain = app.globalData.domain;
    _this.initEleWidth();
  },
    /**
     * 当页面显示时，要刷新一下请求
     */
    onShow:function(){
      let _this = this;
      //请求manor信息
      wx.request({
          url:_this.data.domain + "/Index/user/home?uid=" + _this.data.uid,
          method:"get",
          success:res=>{
              if(res.data.status == 1){             //成功取得
                  _this.requestManor(res.data.message);
              }
              else if(res.data.status == -1) {    //尚未创建manor
                  _this.createManor();
              }
          }
      })
    },
    /** 添加按钮跳转添加页面
     *  id：当前操作用户ID
     *  type：传递操作类型
     */
    add:function(){
      let _this = this;
      wx.navigateTo({
        url: '/pages/goods/goods?manor_id=' + _this.data.shop['id'] + "&type=add"
      })
    },
    /**
     * 跳转创建manor
     */
    createManor:function(){
        wx.showModal({
            title: '提示',
            content: '尚未创建个人据点，是否创建？',
            success: res=>{
                if (res.confirm) {           //跳转创建
                    wx.navigateTo({
                        url:"/pages/point/point?uid=" +_this.data.uid+"&type=add"
                    });
                }else if(res.cancel){        //返回上一页
                    wx.navigateBack();
                }
            }
        });
    },
    /**
     * 请求manor内容
     */
    requestManor:function(res){
      let _this = this;
      let goods = res["goods"];
      let slide = new Array(goods.length).fill("left:0rpx;");
      // goods.forEach(function(i,index){
      //   i['txtStyle']="left:0rpx;";
      // });
      // delete res["goods"];
      _this.setData({
          shop:res,
          goods,
          slide
      })
    },
    /**
     * 跳转详情页
     */
    detail:function(e){
      let id = e.currentTarget.id;
      let index = e.target.dataset.index;
      wx.navigateTo({
          url:"/pages/detail/detail?id="+id
      });
    },

    //拖拽开始时初始化slide为默认值（将所有滑块归位）
    touchS:function(e){
      this.reset();
      if(e.touches.length == 1){
        this.setData({
            startX:e.touches[0].clientX,
        });
      }
    },
    touchM:function (e) {
      let _this = this;
      let txtStyle = "";
        if(e.touches.length == 1){
          let moveX = e.touches[0].clientX;
          let disX = _this.data.startX - moveX;
          let delBtnWidth = this.data.delBtnWidth;

          // if(disX == 0 || disX < 0){
          //   txtStyle = "left:0rpx;";
          // }else{
          //   txtStyle = "left:-" + disX + "px;";
          // }
            txtStyle = "left:-" + disX + "px;";

          if(disX >= delBtnWidth){
            txtStyle = "left:-" + delBtnWidth + "px;";
          }
        }

        let index = e.currentTarget.dataset.index;
        let slide = _this.data.slide;
        // let goods = _this.data.goods;
        // goods[index].txtStyle = txtStyle;
        slide[index] = txtStyle;
        _this.setData({
            // goods
            slide
        });
    },
    touchE:function(e){
      let _this = this;
      if(e.changedTouches.length == 1){
        let endX = e.changedTouches[0].clientX;
        let disX = _this.data.startX - endX;
        let delBtnWidth = _this.data.delBtnWidth;

        let txtStyle = disX > delBtnWidth / 2?"left:-" + delBtnWidth + "px;":"left:0rpx;";

        let index = e.currentTarget.dataset.index;
        let slide = _this.data.slide;
        // let goods = _this.data.goods;
        slide[index] = txtStyle;
        // goods[index].txtStyle = txtStyle;
        _this.setData({slide});
        // _this.setData({goods});
      }
    },

    getEleWidth:function(width){
      return Math.floor(wx.getSystemInfoSync().windowWidth/(750/width));
    },
    initEleWidth:function(){
      let delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
      this.setData({
          delBtnWidth
      });
    },
    reset:function(){
        let slide = this.data.slide;
        slide.fill("left:0rpx;");
        this.setData({
            slide
        });
    },

    /**
     * 删除项
     */
    del:function(e){
      let _this = this;
      let index = e.target.dataset['index'];
      let id = _this.data.goods[index].id;
      wx.showModal({
        title: '提示',
        content: '确认删除' + _this.data.goods[index].title + "?",
        success: res=>{
            if (res.confirm) {           //跳转创建
                wx.request({
                    method:"get",
                    url:_this.data.domain+ "/index/goods/del?id="+id,
                    success:res=>{
                        if(res.data.status == 1){
                            //成功则删除当前列
                            let goods = this.data.goods;
                            let slide = this.data.slide;

                            goods.splice(index,1);
                            slide.splice(index,1);
                            this.setData({
                                slide,
                                goods
                            })
                        }else{

                        }
                        wx.showToast({
                            title:res.data.message,
                            icon:res.data.status == 1? "success":"none"
                        })

                        console.log(res);
                    }
                });

            }else if(res.cancel){        //返回上一页
            }
        }
    });
    }
})
