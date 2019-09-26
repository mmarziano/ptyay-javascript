// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


$(function(){
    attachListeners();
 });

function attachListeners() {
    newStudentButtonListener()
}


 function newStudentButtonListener() {
 $('#add_student').click(function(e) {
     e.preventDefault();
     $('#add_student').hide();
     $('#new-student-form').css("visibility", "visible");
 });    
 $('#student-form').submit(function(e){
    e.preventDefault();
    $.post(
        '/students',
        $(this).serialize(),
        success: function( response ) {
            $('#student-name').append(response.first_name + " " + response.last_name);
            $('#student-grade').append(response.grade);
        });
      });
    });
}
