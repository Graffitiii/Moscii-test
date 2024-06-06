const router = require('express').Router();
const DeviceController = require('../controller/device.controller');

router.post('/createDevice',DeviceController.addDevice);
router.get('/getDevice',DeviceController.getDevice);
router.delete('/deleteDevice',DeviceController.deleteDevice);
router.put('/editDevice',DeviceController.editDevice);


module.exports = router;