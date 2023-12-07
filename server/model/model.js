//Mengimpor modul Mongoose untuk berinteraksi dengan MongoDB
const mongoose=require('mongoose');

//Mendefinisikan skema (schema) untuk model todolist
var schema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Memeriksa apakah tanggal yang dimasukkan lebih besar dari tanggal saat ini
                return value >= new Date();
            },
            message: 'Date must not be in the past'
        }
    },
    status: {
        type: String,
        default: "In progress"
    }
});

//Membuat model Mongoose dengan nama 'todolistdb' berdasarkan skema yang telah didefinisikan sebelumnya.
const todolistdb=mongoose.model('todolistdb', schema);

//Mengeskpor model todolistdb agar dapat digunakan di file lain dalam aplikasi.
module.exports=todolistdb;
