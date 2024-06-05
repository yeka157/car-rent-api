const express = require('express');
const { carController } = require('../Controllers');
const route = express.Router();

route.get('/', carController.getData);
route.post('/', carController.createData);
route.patch('/:id', carController.updateData);
route.delete('/:id', carController.deleteData);


module.exports = route;