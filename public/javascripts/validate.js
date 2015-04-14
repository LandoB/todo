$(document).ready(function() { // Begins jQuery

console.log('*****VALIDATING*****');


// jQuery.validator.setDefaults({
//   debug: true,
//   success: "valid"
// });

		$( "#todoForm" ).validate({
		  rules: {
		    priority: {
		      required: true,
		      range: [1, 100]
		    },
		    title: {
		    	required: true,
		    	minlength: 5,
		    	maxlength: 32
		    },
		    description: {
		    	required: true,
		    	minlength: 5,
		    	maxlength: 50
		    },
		    dueDate: {
		    	required: true,
		    	dateISO: true
		    }
		  }
		});

}); // Ends jQuery



  // function checkForm(form)
  // {
  //   if(form.checkboxfield.checked) {
  //     alert("The checkbox IS checked");
  //   } else {
  //     alert("The checkbox IS NOT checked");
  //   }
  //   return false;
  // }
