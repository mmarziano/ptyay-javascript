// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery
//= require_tree .


// $.ajaxSetup({
//     headers: {
//       'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
//     }
//   });

$( document ).ready(function() {
    attachListeners();
    populateDash();
});

function attachListeners() {
    $('#add_student').on('click', function(e) {
        e.preventDefault();
        newStudentButton();
    });
}

 function newStudentButton() {
        $('#add_student').hide();
        $('#student-form').css("visibility", "visible");
        addStudent();
}

function addStudent() {
    $('#student-form').submit(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var post_url = '/students'; 
        var request_method = 'POST'; 
        var form_data = $(this).serialize(); 

        Rails.ajax({
            url : post_url,
            type: request_method,
            data : form_data, 
            success: function(newStudent) {
                $('#student-list').append('<tr><td>' + newStudent.first_name + '</td><td>' + newStudent.grade + '</td></tr>');
            },
            error: function() {
                alert('Error saving student')
            }
        });
        $('#student-form').css("visibility", "hidden");
        $('#add_student').show();
    });
}

function populateDash() {
    $.get( "/student_list", function( data ) {
        for (var i = 0; i < data.length; i++) {
            $('#student-list').append('<tr><td>' + data[i].first_name + '</td><td>' + data[i].grade + '</td></tr>');
        }
      });
}