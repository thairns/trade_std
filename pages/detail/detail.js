//home.js
//获取应用实例
const app = getApp();

Page({
    data: {
        domain:'',
        goods:{},
    },
    onLoad: function (options) {
        options.id = 126;
        let _this = this;
        _this.data.domain = app.globalData.domain;
        let domain_static = app.globalData.domain_static;
        if(options.id){
            wx.request({
                url:_this.data.domain + "/index/goods/query?id="+options.id,
                method:'get',
                success:res=>{
                    let goods = res.data.message;

                    goods.thumbnail.forEach(function(i,index){
                       goods.thumbnail[index] = domain_static + "/" +  i;
                    });
                    _this.setData({goods});

                }
            })
        }else {
            wx.navigateBack();
        }
    },
    preview:function(e){
        let _this = this;
        wx.previewImage({
            urls:_this.data.goods.thumbnail,
            current:_this.data.goods.thumbnail[e.currentTarget.dataset.index]
        });
    }
})
