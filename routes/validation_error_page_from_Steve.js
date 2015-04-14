// ******* This is the validation error page from Steve

app.post('/todo', function (req,res) {
   console.log(req.body);

 var mytodo = new Todo(req.body);
 mytodo.save(function (err, todo) {
   if(err) {
       console.log(err);
       res.render("error", {
       error: {
         status: 500,
         stack: JSON.stringify(err.errors)
       },
       message: "You failed!"
       })
   } else {
   res.render("todoList", {
     title: "Todo created",
     message: "Success!",

   })
   }

   console.log(todo);
 });

res.render("todoList", {
   title: "Tdodo created",
   message: "Success!",
   postData: JSON.stringify(req.body)
 })
});



//
