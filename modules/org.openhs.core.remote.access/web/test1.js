/*
$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});
*/


$(document).ready(function() {
   $("p").click(function() {
   //var orderId =  $("#orderId").val();
   $.post("clock", { orderId : "John"},
   function(data) {
     //alert("Data Loaded: " + data);
   });
   });
 });



/*

$(document).ready(function() {
   $("p").click(function() {
	    $.get("clock", function(data, status){
	        alert("Data: " + data + "\nStatus: " + status);
	    });
   });
 });
*/