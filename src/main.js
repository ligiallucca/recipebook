$(document).ready(function() {
  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $("#register-user-email").val();
    let password = $("#register-user-password").val();

    console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
        window.location = "src/home-page.html"
      })  
      .cath(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  })
  $("#enter-button").click(function(event) {
    event.preventDefault();

    let email = $("#user-email").val();
    let password = $("#user-password").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      window.location = "src/home-page.html"
    })
    .cath(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  })
  $("#google-button").click(function(event) {
    event.preventDefault();

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      let token = result.credential.accessToken;
      let user = result.user;
      window.location = "src/home-page.html?id="
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
    });
  })
});