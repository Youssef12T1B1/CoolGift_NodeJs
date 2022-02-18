 $("#createCategory").submit(function(event){
    alert("User Created Successfully")
})

$("#UpdateCategory").submit(function(event){
    event.preventDefault()
     var unindexed_array = $(this).serializeArray()
     var data = {}

     $.map(unindexed_array, function(n,i){
         data[n['name']] = n['value']
     })  
    
   
     var request = {
        "url" : `http://localhost:3000/api/categories/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert('Category  Updated Successfully')
    })
})

if(window.location.pathname == '/admin/categories'){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){
      var id = $(this).attr("data-id")
      
     var request = {
        "url" : `http://localhost:3000/api/categories/${id}`,
        "method": "DELETE",
      
    }

    if(confirm("Are u sure?")){
        $.ajax(request).done(function(response){
            alert('Category Deleted Successfully')
            location.reload()
        })
    }

    })
}