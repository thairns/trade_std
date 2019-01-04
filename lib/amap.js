//高德地图封装
let amapFile = require("./amap-wx");
let key = 'xxxxxxxxxxxxxxxxxxxxxxxx';
let myAmapFun = new amapFile.AMapWX({key});

class Amap{
    static getPoiAround({obj}){
        return new Promise(
            (resolve,reject)=> myAmapFun.getPoiAround({
                obj,
                success:resolve,
                fail:reject
            })
        );
    }
}
