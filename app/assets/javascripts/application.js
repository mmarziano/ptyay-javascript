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
    var user;
    attachListeners();
    populateDash();
});

function attachListeners() {
    $('#add_student').on('click', function(e) {
        e.preventDefault();
        newStudentButton();
    });
    $('#close-fundraiser').on('click', function(e){
        e.preventDefault();
        $('#fundraiser-form').hide();
        $('#new-fundraiser-btn').show();
    });
    $('#close-student').on('click', function(e){
        e.preventDefault();
        $('#student-form').hide();
        $('#add_student').show();
    });
    $('#new-fundraiser-btn').on('click', function(e){
        e.preventDefault();
        $('#new-fundraiser-btn').hide();
        $('#fundraiser-form').show();
        newFundraiser();
    });
}


function getUser() {
    let user = {};
    Rails.ajax({
        url : '/get_user',
        type: 'GET',
        data : $(this).serialize(),
        success: function(data) {
            user.firstName = data.first_name;
            user.lastName = data.last_name;
            user.email = data.email;
            user.admin = data.admin;
            user.schoolId = data.school_id;
            user.householdId = data.household_id;
    },
        error: function() {
            alert('Error retrieving user')
        }
    });
    return user;
}

function newStudentButton() {
        $('#add_student').hide();
        $('#student-form').show();
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
                $('#student-list').append('<tr><td>' + newStudent.first_name + ' ' + newStudent.last_name + '</td><td>' + newStudent.grade + '</td></tr>');
            },
            error: function() {
                alert('Error saving student')
            }
        });
        $('#student-form').hide();
        $('#add_student').show();
    });
}

function newFundraiser() {
    let currentUser = getUser()
    $('#fundraiser-form').submit(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        var post_url = '/fundraisers'; 
        var request_method = 'POST'; 
        var form_data = $(this).serialize(); 
        Rails.ajax({
            url : post_url,
            type: request_method,
            data : form_data, 
            success: function(newFundraiser) {
                var status = newFundraiser.status;
                var title = newFundraiser.title;
                console.log(newFundraiser);
            },
            error: function() {
                alert('Unable to create fundraiser.')
            }
        });
       console.log(currentUser);
    });

}

function populateDash() {
    $.get( "/student_list", function( data ) {
        for (var i = 0; i < data.length; i++) {
            $('#student-list').append('<tr><td>' + data[i].first_name + ' ' + data[i].last_name + '</td><td>' + data[i].grade + '</td></tr>');
        }
      });
}



//<td>Completed!</td>
//* <td><%= link_to fundraiser.title, fundraiser_path(fundraiser) %></td>
// <td><%= fundraiser.format_date %></td> 
// <td>$<%= fundraiser.fundraiser_info("price") %></td> 
// <td><%= fundraiser.fundraiser_info("location") %></td> 
//<% if @user.admin? %>
 //   <td><%= link_to raw("&#9998;"), edit_fundraiser_path(fundraiser), style: "color: white; margin-right: 5px" %><%= link_to raw("&#10008;"), fundraiser_path(fundraiser), method: :delete %></<% end %>