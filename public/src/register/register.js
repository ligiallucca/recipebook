const database = firebase.database();

$(document).ready(function() {
  // const database = firebase.database();

  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $("#validationServer04").val();
    let password = $("#validationServer05").val();
    let name = $("#validationCustom01").val();
    let lastname = $("#validationCustom02").val();
    let username = $("#validationServerUsername").val();
    let birthday = $("#validationServer03").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        database.ref(`users/${response.user.uid}`).update({
          name: name,
          lastname: lastname,
          username: username,
          birthday: birthday
        })
        window.location = `/public/src/post/post.html?id=${response.user.uid}`
      })  
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
        if (validationCustom01 === ""){
          $("#feedback-name").append
        }
      });
  })
});