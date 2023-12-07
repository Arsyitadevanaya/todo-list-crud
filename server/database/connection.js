//Mengimpor modul Mongoose untuk berinteraksi dengan MongoDB
const mongoose = require('mongoose');

//Membuat fungsi asinkron connectDB yang akan menangani koneksi ke MongoDB.
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URL, { //Menggunakan mongoose.connect untuk membuat koneksi dengan MongoDB. 
            useNewUrlParser: true,  //Menggunakan opsi useNewUrlParser dan useUnifiedTopology untuk menghindari peringatan yang dapat terjadi.
            useUnifiedTopology: true  
        })

        console.log(`MongoDB connected : ${con.connection.host}`);  //Jika koneksi berhasil, mencetak pesan ke konsol bahwa MongoDB terhubung dan menampilkan hostnya.
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB //Mengeskpor fungsi connectDB agar dapat digunakan di file lain dalam aplikasi