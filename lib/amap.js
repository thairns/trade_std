//高德地图封装
let amapFile = require("./amap-wx");
let key = '4f2592133b9b0f2f6a19a6d7cdd457fe';
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

module.exports = Amap;
