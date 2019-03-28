$(document).ready(function() {
  $("#register-button").click(function(event) {
    event.preventDefault();
    window.location = "/src/register/register.html"
  });  

  $("#enter-button").click(function(event) {
    event.preventDefault();
   
    let email = $("#user-email").val();
    let password = $("#user-password").val();
   
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      window.location = "/src/home-page/home-page.html"
    })
    .cath(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  })
});