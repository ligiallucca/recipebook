const database = firebase.database();

$(document).ready(function() {
  // const database = firebase.database();

  $("#register-button").click(function(event) {
    event.preventDefault();

    let email = $(".register-user-email").val();
    let password = $(".register-user-password").val();
    let name = $(".first-name").val();
    let lastname = $(".user-last-name").val();
    let username = $(".user-name").val();
    // let birthday = $(".birthday")
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        database.ref(`users/${response.user.uid}`).update({
          name: name,
          lastname: lastname,
          username: username
          // birthday: birthday
        })
        window.location = `/public/src/post/post.html?id=${response.user.uid}`
      })  
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  })
});