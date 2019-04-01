const database = firebase.database();

$(document).ready(function() {
  $("#register-button").click(function(event) {
    event.preventDefault();
    
    let email = $("#register-user-email").val();
    let password = $("#register-user-password").val();
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
      console.log(response.user.uid);
      window.location = "/src/post/post.html?id=" + response.user.uid;
    })  
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
  })
});