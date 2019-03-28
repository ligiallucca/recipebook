$(document).ready(function() {
  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $("#register-user-email").val();
    let password = $("#register-user-password").val();

    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        window.location = "../home-page/home-page.html"
      })  
      .cath(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  })
});