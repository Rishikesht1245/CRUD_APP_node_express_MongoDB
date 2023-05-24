$('#add_user').submit(function(event){
      alert('Data inserted successfully!')
      location.reload()
})



      $('#update_user').submit(function(event) {
        event.preventDefault();
    
        const formData = $(this).serialize();
        const userId = $('#userId').val();
    
        $.ajax({
          url: `/api/todos/${userId}`,
          type: 'PUT',
          data: formData,
          success: function(response) {
           alert("Data Updated Successfully!")
          },
          error: function(error) {
            console.log(error)
          }
        });
 });

 $(document).ready(function() {
      // Attach click event listener to delete buttons
      $('.delete-btn').on('click', function() {
        const id = $(this).data('id');
        if(confirm('Do you want to delete this record?')){
            $.ajax({
                  url: '/api/todo/' + id,
                  method: 'DELETE',
                 
                  success: function(result) {
                    alert('Data Deleted Successfully');
                    location.reload();
                  },
                  error: function(err) {
                    console.error(err);
                  }
                });
        }
        });
      });