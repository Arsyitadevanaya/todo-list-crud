const mongoose=require('mongoose');

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
        default: "Pending"
    }
});

const todolistdb=mongoose.model('todolistdb', schema);

module.exports=todolistdb;
