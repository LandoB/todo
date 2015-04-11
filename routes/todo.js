var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;



var todoSchema = new Schema({
  due_date: Date,
  timestamp: { type: Date, default: Date.now },
  description: String,
  title:  String,
  priority: Number,
  complete: Boolean
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
  		console.log(tasks);
  	} else {
  		return console.log(err);
  	}
  });
});

// POST method route
router.post('/', function (req, res) {
  //res.send('POST request to the homepage');
  new Todo({
		  due_date: req.body.due_date,
		  //timestamp: { type: Date, default: Date.now },
		  description: req.body.description,
		  title:  req.body.title,
		  priority: req.body.priority,
		  //complete: Boolean
	}).save(function (err, task){
		if(err) {
			return console.log(err);
		}
		console.log(task);
	});

	res.redirect('todo');
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = router;
