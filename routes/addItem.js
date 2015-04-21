var express = require('express');
var router = express.Router();


//$(document).ready(function() { // Starts jQuery

 //$(".addButton").click(function () {
   //console.log(this);


      /* GET home page. */
      router.get('/', function(req, res, next) {
        res.render('index', {
          title: 'Express To Do App',
          header: 'Hello!',
          body_text: 'your To Do List app.'
        });
      });


  //}); // End of .addButton

      module.exports = router;

//}); // End of jQuery
