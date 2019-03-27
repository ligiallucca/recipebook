$(document).ready(function() {
  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $("#register-user-email").val();
    let password = $("#register-user-password").val();

    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){

      })  
      .cath(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
  })
  $("#enter-button").click(function(event) {
    event.preventDefault();

    let email = $("#user-email").val();
    let password = $("#user-password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .cath(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorMessage);
    });
  })
});