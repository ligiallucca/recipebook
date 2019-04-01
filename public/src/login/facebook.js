$(document).ready(function() {
	$("#facebook-button").click(function(event) {
		event.preventDefault();
		
		let provider = new firebase.auth.FacebookAuthProvider();
		
		firebase.auth().signInWithPopup(provider)
		.then(function(response) {
			// let token = result.credential.accessToken;
			// let user = result.user;
			window.location = "/public/src/post/post.html?id="+ response.user.uid;
			
		}).catch(function(error) {
			let errorCode = error.code;
			let errorMessage = error.message;
			let email = error.email;
			let credential = error.credential;
		});
	})
});		

