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
      window.location = "/src/post/post.html"
      
    })
    .catch(function() {
      $("#invalid-email-password").html("E-mail ou senha inválidos.")
    });
  })

  $("#forget-password").click(function(){
    window.location = "/src/login/password.html"
  })
});