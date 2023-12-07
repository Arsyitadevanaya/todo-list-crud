
//Menambahkan event handler untuk form dengan ID add_task.
$("#add_task").submit(function(event){
    alert("Data Inserted Successfully");
})

//Menambahkan event handler untuk form dengan ID update_task.
$("#update_task").submit(function(event){
    event.preventDefault();  //Mencegah aksi default formulir (preventDefault()).

    var unindexed_array = $(this).serializeArray();
    var data = {} //Mengumpulkan data formulir dan membuat objek data.

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    //Membuat objek request untuk permintaan AJAX PUT ke endpoint yang sesuai dengan ID tugas.
    var request = {
        "url": `http://localhost:2020/api/todolist/${data.id.trim()}`,
        "method" : "PUT",
        "data" : data
    }
    //Mengirim permintaan untuk memperbarui data, menampilkan peringatan jika berhasil.
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

//Mengecek apakah halaman saat ini adalah halaman utama ("/").
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete"); //Menambahkan event handler untuk tombol delete di dalam tabel.
    $ondelete.click(function(){
        var id = $(this).attr("data-id") //Mengambil ID dari elemen tombol yang diklik.

        //Membuat objek request untuk permintaan AJAX DELETE ke endpoint yang sesuai dengan ID tugas.
        var request = {
            "url" : `http://localhost:2020/api/todolist/${id}`,
            "method" : "DELETE"
        }

        //Menampilkan konfirmasi sebelum menghapus data.
        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}