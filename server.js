// Import modul-modul yang diperlukan
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

// Import fungsi koneksi database dari modul kustom
const connectDB = require('./server/database/connection');

// Buat aplikasi Express
const app = express();

// Muat variabel lingkungan dari file .env
dotenv.config({ path: 'config.env' });

// Tentukan port untuk server, gunakan 2020 jika tidak ditentukan di lingkungan
const PORT = process.env.PORT || 2020;

// Middleware untuk mencatat permintaan (log requests)
app.use(morgan('tiny'));

// Bangun koneksi ke MongoDB menggunakan fungsi connectDB
connectDB();

// Middleware untuk mengurai badan permintaan yang berformat URL-encoded
app.use(bodyparser.urlencoded({ extended: true }));

// Setel mesin tampilan menjadi EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Hapus tanda komentar di bawah jika Anda ingin menentukan direktori tampilan kustom
// app.set("views", path.resolve(__dirname, "views/ejs"));

// Layani aset statis (CSS, gambar, JavaScript) dari direktori yang ditentukan
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Muat rute yang didefinisikan dalam modul router
app.use('/', require('./server/routes/router'));

// Mulai server dan dengarkan permintaan yang masuk pada port yang ditentukan
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
