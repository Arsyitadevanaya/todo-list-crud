

$("#add_task").submit(function(event){
    alert("Data Inserted Successfully");
})

$("#update_task").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    // var request = {
    //     "url" : `http://localhost:2020/api/todolist/${data.id}`,
    //     "method" : "PUT",
    //     "data" : data
    // }
    var request = {
        "url" : "http://localhost:2020/update-task", // Sesuaikan URL dengan rute baru
        "method" : "POST",
        "data" : data
    }
    
    
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        // Setelah permintaan Ajax selesai, kirim formulir
        $("#update_task")[0].submit();
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:2020/api/todolist/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}