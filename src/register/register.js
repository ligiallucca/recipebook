$(document).ready(function() {
  // const database = firebase.database();

  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $("#register-user-email").val();
    let password = $("#register-user-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        window.location = "/src/post/post.html"
      })  
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  })
});