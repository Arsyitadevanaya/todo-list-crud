//inpor modul express dan membuat instance dari router untuk menangani route
const express=require('express');
const route=express.Router()

//Mengimpor modul services yang berisi fungsi-fungsi untuk merender halaman.
const services=require('../services/render')
//Mengimpor modul controller yang berisi fungsi-fungsi untuk mengelola operasi CRUD.
const controller=require('../controller/controller');

/**
 * @description Root Route
 * @method GET/
 */

//Menangani permintaan GET ke rute utama (/) dengan menggunakan fungsi homeRoutes dari modul services. Ini akan merender halaman utama aplikasi.
route.get('/', services.homeRoutes);

/**
 * @description add task
 * @method GET/add-task
 */

//Menangani permintaan GET ke rute /add-task dengan menggunakan fungsi add_task dari modul services. Ini akan merender halaman untuk menambah 
route.get('/add-task', services.add_task);

/**
 * @description update task
 * @method GET/update-task
 */

//Menangani permintaan GET ke rute /update-task dengan menggunakan fungsi update_task dari modul services. Ini akan merender halaman untuk memperbarui tugas.
route.get('/update-task', services.update_task);

//Menangani operasi CRUD melalui API
route.post('/api/todolist',controller.create);
route.get('/api/todolist',controller.find);
route.put('/api/todolist/:id',controller.update);
route.delete('/api/todolist/:id',controller.delete)

//Mengeskpor objek rute untuk digunakan di file lain dalam aplikasi
module.exports=route