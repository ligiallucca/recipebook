$(document).ready(() => {
  $("#google-button").click(event => {
    event.preventDefault();

    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(response => window.location = `post.html?id=${response.user.uid}`})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			alert(errorCode, errorMessage, email, credential);
		});
  })
});
