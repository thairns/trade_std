//home.js
//获取应用实例
Component({
    behaviors: ['wx://form-field'],
    properties:{
        display:{
            type:Boolean,
            value:false,
        },
    },
    data:{
        markers: [],
        domain:getApp().globalData.domain,
        cursor:0,
        value:{}
    },
    methods:{
        suggestion:function(e){
            let _this = this;
            let keyword = e.detail.value;
            let cursor = e.detail.cursor;

            if(_this.data.cursor != cursor){
                _this.data.cursor = cursor;
                let markers = _this.data.markers;
                markers.length = 0;
                if(keyword.length > 0 ) {
                    _this.setData({display:true});
                    wx.request({
                        url: _this.data.domain + "/index/map/suggestion?keyword=" + keyword,
                        method: 'get',
                        success: (res) => {
                            for(let i in res.data.data){
                                markers.push(res.data.data[i]);
                            }
                            _this.setData({markers});
                        }
                    });
                }else{
                    _this.setData({display:false});
                }
            }
        },
        touch:function(e){
            this.setData({
                display:false,
                value:e.currentTarget.dataset.address
            });
        }
    }
});