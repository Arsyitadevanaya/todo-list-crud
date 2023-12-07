const express=require('express');
const route=express.Router()

const services=require('../services/render')
const controller=require('../controller/controller');

/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeRoutes);

/**
 * @description add task
 * @method GET/add-task
 */

route.get('/add-task', services.add_task);

/**
 * @description update task
 * @method GET/update-task
 */

route.get('/update-task', services.update_task);

//API
route.post('/api/todolist',controller.create);
route.get('/api/todolist',controller.find);
route.put('/api/todolist/:id',controller.update);
route.delete('/api/todolist/:id',controller.delete);
route.post('/update-task', controller.updateTask);

module.exports=route