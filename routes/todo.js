var express = require('express');
var router = express.Router();
var todoList = [];

// Include the model for a Todo that we set up in Mongoose
var Todo = require('../models/todo');

// Send the todo list back to the client
var sendTodoList = function (req, res, next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
    } else {
      res.render("todoList", {
        title: "List of tasks",
        message: "Things you still need to do",
        todos: list
      });
    }
  });
}

// Handle a GET request from the client to /todo/list
router.get('/list', function (req,res,next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringify(err.errors)
          },
          message: "Could not find any tasks"
        });
    } else {
      sendTodoList(req, res, next);
    }
  });
});

// Handle a DELETE request from the client to /todo
router.delete('/', function (req, res) {
  Todo.find({ _id: req.body.todo_id })
      .remove(function (err) {

    // Was there an error when removing?
    if (err) {
      res.render("error", {
        error: {
          status: 500,
          stack: JSON.stringify(err.errors)
        },
        message: "Could not delete the task"
      });

    // Delete was successful
    } else {
      res.send("SUCCESS");
    }
  });

});

// Handle a POST request from the client to /todo
router.post('/', function (req, res, next) {

  // User is editing an existing item
  if (req.body.db_id !== "") {

    // Find it
    Todo.findOne({ _id: req.body.db_id }, function (err, foundTodo) {

      if (err) {
        console.log(err);
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringify(err.errors)
          },
          message: "Could not find that task."
        });
      } else {
        // Found it. Now update the values based on the form POST data.
        foundTodo.title = req.body.title;
        foundTodo.description = req.body.description;
        foundTodo.priority = req.body.priority;
        foundTodo.due_date = req.body.due_date;
        foundTodo.complete = (req.body.complete) ? req.body.complete : false;

        // Save the updated item.
        foundTodo.save(function (err, newOne) {
          if (err) {
            res.render("error", {
              error: {
                status: 500,
                stack: JSON.stringify(err.errors)
              },
              message: "Could not save task with updated information."
            });
          } else {
            res.redirect('/todo/list');
          }
        });
      }
    });

  // User created a new item
  } else {
    var mytodo = new Todo(req.body);

    mytodo.save(function (err, todo) {
      if (err) {
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringify(err.errors)
          },
          message: "Could not create a New Item. See the error below for more information and then try it again."
        });
      } else {
        res.redirect('/todo/list');
      }
    });
  }
});

// Handle a GET request from the client to /todo/:id

// This is a little bit different since I wanted to use an index.js and a edit.js
router.get('/:id', function (req, res) {
  //console.log(req.params.id);

        Todo.find({ _id: req.params.id }, function (err, item) {
          var thisItem = item[0];


          //was there an error when removing?
          if (err) {
           console.log(err);

          // Find was succesful
          } else {
            //res.send("SUCCESS!");

            // If EDITing an existing item
              res.render('edit', {  // Changed to edit instead of index to be able to access edit.ejs
                  title: 'Express To Do App',
                  header: '<<<<< Edit Mode >>>>>',
                  body_text: 'Please enter the new information for your To Do Item',
                  todo: thisItem
                });
          }
      });

});



// Handle a GET request from the client to /todo/:id <--comment

// router.get('/:id', function (req, res) {

//   Todo.find({ _id: req.params.id }, function (err, item) {
//     var thisItem = item[0];

    // Was there an error when retrieving? <--comment
    // if (err) {
    //   console.log(err);

    // Find was successful <--comment
//     } else {
//       res.render('todo', {
//         title : 'Express Todo Example',
//         todo: thisItem
//       });
//     }
//   });
// });



// Handle a GET request from the client to /todo
router.get('/', function (req, res) {
  // Send the todo form back to the client
  res.render('todo', {
    title : 'Express Todo Example',
    todo: {
      title: '',
      description: '',
      priority: 1,
      due_date: new Date(),
      complete: false
    }
  });

});

module.exports = router;




