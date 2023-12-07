//Mengimpor model todolist dari file model.js untuk berinteraksi dengan MongoDB.
var todolistdb = require('../model/model');

//create and save new todolist
exports.create = (req, res) => {
    // Validasi permintaan
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Membuat objek todolist baru berdasarkan data dari permintaan
    const todolist = new todolistdb({
        task: req.body.task,
        deadline: req.body.deadline,
        status: req.body.status
    })
    // Menyimpan todolist dalam database
    todolist.save()
        .then(data => {
            res.redirect('/add-task');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrieve and return all todolist/retrive and return a single todo list
exports.find = (req, res) => {
    if (req.query.id) {
        // Jika terdapat parameter query id, mencari dan mengembalikan satu tugas berdasarkan ID
        const id = req.query.id;
        todolistdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found todo list with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving todo list with id " + id });
            });
    } else {
        // Jika tidak ada parameter query id, mengambil semua tugas
        todolistdb.find()
            .then(todolist => {
                res.send(todolist);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retrieving todo list information" });
            });
    }
}




//update a new identified todolist by todolist id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    todolistdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update todo list with ${id}. Maybe todo list not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update todo list information" });
        });
}

//delete a new identified todolist by todolist id
exports.delete = (req, res) => {
    const id = req.params.id; //Menangani permintaan DELETE untuk menghapus tugas berdasarkan ID.

    todolistdb.findByIdAndDelete(id) //Menggunakan findByIdAndDelete untuk menghapus tugas berdasarkan ID.
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "todo list was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete todo list with id=" + id
            });
        });
}

