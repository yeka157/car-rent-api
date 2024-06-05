const express = require('express');
const { orderController } = require('../Controllers');
const route = express.Router();

route.get('/', orderController.getData);
route.post('/', orderController.createData);
route.patch('/:id', orderController.updateData);
route.delete('/:id', orderController.deleteData);


module.exports = route;