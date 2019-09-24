// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

 $(function(){
       attachListeners();
    });

function attachListeners() {
    $('#fundraiser-form').submit(function(e){
        e.preventDefault();
        let url = '/fundraisers'
        let data = $(this).serialize();
        let posting = $.post(url, data);
        posting.done(function(d) {
            console.log(d)
        });      
  });
}