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

$("#UpdateProject").submit(function(event){
    event.preventDefault()
     var unindexed_array = $(this).serializeArray()
     var data = {}

     $.map(unindexed_array, function(n,i){
         data[n['name']] = n['value']
     })  
    
   
     var request = {
        "url" : `http://localhost:3000/api/products/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert('Product  Updated Successfully')
    })
})

// Dropzone.option.dropzoneForm = {
//     acceptedFiles  : "images/*",
//     init: function(){
// this.on('queuecomplete', (file)=>{
//     setTimeout(()=>{
//         location.reload()
//     }, 1000)
// })
//     }
// }

if(window.location.pathname == '/admin/Categories'){
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

if(window.location.pathname == '/admin/products'){
    $ondelete = $(".table tbody td a.delete")
    $ondelete.click(function(){
      var id = $(this).attr("data-id")
      
     var request = {
        "url" : `http://localhost:3000/api/products/${id}`,
        "method": "DELETE",
      
    }

    if(confirm("Are u sure?")){
        $.ajax(request).done(function(response){
            alert('Product Deleted Successfully')
            location.reload()
        })
    }

    })
}

function readURL(input){
    if (input.files && input.files[0]){
        var reader = new FileReader()
        reader.onload = function(e){
            $("#imgpreview").attr('src', e.target.result).width(80).height(80)
        }
        reader.readAsDataURL(input.files[0])


    }
} 

$("#image").change(function(){
 
        readURL(this) 
    
})