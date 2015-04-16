var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;

var todoSchema = mongoose.Schema({
  due_date: Date,
  timestamp: { type: Date, default: Date.now },
  description: { type: String, required: true },
  title:  { type: String, required: true },
  priority: Number,
  complete: { type: Boolean, default: false }
});

var Todo = mongoose.model("Todo", todoSchema);

// GET todo page.
router.get('/', function (req, res, next) {
  //res.send('GET request to the homepage');
  return Todo.find(function(err, tasks){
  	if(!err) {
  		res.render('todo', {
  			greeting: 'Here is your To Do List',
  			tasks: tasks
  		});
  		//console.log(tasks);
  	} else {
  		return console.log(err);
  	}
  });
});

// Handle a DELETE request from the client to /todo
router.delete('/', function (req, res) {
  console.log(req.body.todo_id);
  Todo.find({ _id: req.body.todo_id })
      .remove (function (err) {

    //was there an error when removing?
    if (err) {
     console.log(err);

    // Delete was succesful
    } else {
      res.send("SUCCESS!");
    }
  });
});

// POST method route
router.post('/', function (req, res) {
  //res.send('POST request to the homepage');
  new Todo({
		  due_date: req.body.due_date,
		  timestamp: { type: Date, default: Date.now },
		  description: req.body.description,
		  title:  req.body.title,
		  priority: req.body.priority,
		  complete: req.body.complete
	}).save(function (err, task){
		if(err) {
			return console.log(err);
		}
		//console.log(task);
		console.log("WHAT IS THIS? =======> ", req.body.complete);
	});

	res.redirect('todo');
});

module.exports = router;




