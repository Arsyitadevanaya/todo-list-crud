const axios = require('axios');

exports.homeRoutes=(req,res)=>{
     // Melakukan permintaan GET ke /api/todolist
    axios.get('http://localhost:2020/api/todolist')
        .then(function(response){
            // Merender halaman 'index' dengan data todolist yang diperoleh dari permintaan
            res.render('index', { todolist : response.data });
        })
        .catch(err =>{
            // Menangani kesalahan dan mengirimkannya sebagai respons
            res.send(err);
        })
}

exports.add_task=(req,res)=>{
    // Merender halaman 'add_task'
    res.render('add_task');
}

exports.update_task = (req, res) => {
    // Melakukan permintaan GET ke /api/todolist dengan parameter id yang diterima dari query
    axios.get('http://localhost:2020/api/todolist', { params : { id : req.query.id }})
        .then(function(todolistdata){
            // Merender halaman 'update_task' dengan data todolist yang diperoleh dari permintaan
            res.render("update_task", { todolist : todolistdata.data})
        })
        .catch(err =>{
            // Menangani kesalahan dan mengirimkannya sebagai respons
            res.send(err);
        })
}

