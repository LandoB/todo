$(document).ready(function() { // Starts jQuery

 $(".deleteButton").click(function () {
   //console.log(this);
   var todoItemId = $(this)[0].id;           // Selector always going to return an index
      console.log(todoItemId);
      $.ajax({   // instead of GET
           url: "/todo",
           method: "DELETE",     // Then have to tell it what to delete
           data: {
               todo_id: todoItemId
           },
           success : function(response) {

                  //Remove the DOM element (you've done this before)
                  $("#todo_"+ todoItemId).remove();
                  alert("Item deleted succesfully.");

                  } // end of success

       });  // End of Ajax
  });

}); // Ends jQuery
