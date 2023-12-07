const axios = require('axios');

exports.homeRoutes=(req,res)=>{
    // Make a get request to /api/todolist
    axios.get('http://localhost:2020/api/todolist')
        .then(function(response){
            res.render('index', { todolist : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_task=(req,res)=>{
    res.render('add_task');
}

exports.update_task=(req,res)=>{
    axios.get('http://localhost:2020/api/todolist', { params : { id : req.query.id }})
        .then(function(todolistdata){
            res.render("update_task", { todolist : todolistdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
