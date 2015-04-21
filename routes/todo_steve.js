var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;
var todoList = [];


var todoSchema = mongoose.Schema({
  due_date: Date,
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  title:  { type: String, required: true },
  priority: Number,
  complete: { type: Boolean, default: false }
});


// Include the model for a Todo that we set up in Mongoose
var Todo = mongoose.model("Todo", todoSchema);

// Send the todo list back to the client
var sendTodoList = function (req, res, next) {
  Todo.find({}, function (err, list) {
    if (err) {
      console.log(err);
    } else {
        res.render('todo', {
        greeting: 'Here is your To Do List',
        tasks: tasks
      });
    }
  });
};

// Handle a GET request from the client to /todo/list
router.get('/', function (req,res,next) {
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
            res.redirect('/');
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
          message: "You failed!"
        });
      } else {
        res.redirect('todo');
      }
    });
  }
});

// Handle a GET request from the client to /todo/:id
router.get('/:id', function (req, res) {

  Todo.find({ _id: req.params.id }, function (err, item) {
    var thisItem = item[0];

    // Was there an error when retrieving?
    if (err) {
      console.log(err);

    // Find was successful
    } else {
      res.render('todo', {
        title : 'Express Todo Example',
        todo: thisItem
      });
    }
  });
});

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
