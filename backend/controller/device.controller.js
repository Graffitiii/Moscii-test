const DeviceServices = require('../services/device.services');


exports.addDevice = async (req,res,next)=>{
    try {
        const {name,type} = req.body;

        let create = await DeviceServices.addDevice(name,type);

        res.json({status:true,success:create});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.getDevice = async (req,res,next)=>{
    try {
        let device = await DeviceServices.getDevice();

        res.json({status:true,list:device});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.deleteDevice = async (req,res,next)=>{
    try {
        
        // const id = req.query.id;
        const {id} = req.body;

        let device = await DeviceServices.deleteDevice(id);

        res.json({delete:true});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}

exports.editDevice = async (req,res,next)=>{
    try {
        
        // const id = req.query.id;
        const {id, name, type} = req.body;
        
        let device = await DeviceServices.editDevice(id, name, type);

        res.json({update:true,deviceId:device._id});
    } catch (error) {
        // throw err;
        res.json({status:false,success:'Error'})
    }
}
