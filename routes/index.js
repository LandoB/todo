var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express To Do App',
  	header: 'Hello!',
  	body_text: 'your To Do List app.'
	});
});

module.exports = router;



