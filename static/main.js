// $("#createUser").submit(function(event){
//     alert("User Created Successfully")
// })

// $("#UpdateUser").submit(function(event){
//     event.preventDefault()
//      var unindexed_array = $(this).serializeArray()
//      var data = {}

//      $.map(unindexed_array, function(n,i){
//          data[n['name']] = n['value']
//      })  
    
   
//      var request = {
//         "url" : `http://localhost:3000/api/users/${data.id}`,
//         "method": "PUT",
//         "data": data
//     }

//     $.ajax(request).done(function(response){
//         alert('User Updated Successfully')
//     })
// })

// if(window.location.pathname == '/'){
//     $ondelete = $(".table tbody td a.delete")
//     $ondelete.click(function(){
//       var id = $(this).attr("data-id")
      
//      var request = {
//         "url" : `http://localhost:3000/api/users/${id}`,
//         "method": "DELETE",
      
//     }

//     if(confirm("Are u sure?")){
//         $.ajax(request).done(function(response){
//             alert('User Deleted Successfully')
//             location.reload()
//         })
//     }

//     })
// }