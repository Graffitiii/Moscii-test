const { json } = require('body-parser');
const DeviceModel = require('../model/device.model');


class DeviceServices{
    static async addDevice(name,type){

        const createClub = new DeviceModel({name,type});
        
        return await createClub.save();

        
    }

    static async getDevice(){
        
        const deviceList = DeviceModel.find()

        return deviceList;
        
    }
   
    static async deleteDevice(id){
        const deviceDelete = await DeviceModel.deleteOne({"_id": id})
    }

    static async editDevice(id, name, type){
        const deviceUpdate = await DeviceModel.findOneAndUpdate({"_id": id},{$set: {name: name, type: type}})
        return deviceUpdate
    }
}

module.exports = DeviceServices;