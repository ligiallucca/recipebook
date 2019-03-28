$(document).ready(function() {
    $("#facebook-button").click(function(event) {
     event.preventDefault();

    var provider = new firebase.auth.FacebookAuthProvider();


    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
// window.fbAsyncInit = function() {
//     FB.init({
//         appId      : '{752454475151882}',
//         cookie     : true,
//         xfbml      : true,
//         version    : '{v3.2}'
//     });
    
//     FB.AppEvents.logPageView();   
// };

// (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));


// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//     });
// }

// $(document).ready(function() {
//      $("#facebook-button").click(function(event) {
//       event.preventDefault();
     
//       let provider = new firebase.auth.GoogleAuthProvider();
     
//       firebase.auth().signInWithPopup(provider)
//       .then(function(result) {
//         let token = result.credential.accessToken;
//         let user = result.user;
//         window.location = "/src/home-page/home-page.html?id="
//       })
//       .catch(function(error) {
//         let errorCode = error.code;
//         let errorMessage = error.message;
//         let email = error.email;
//         let credential = error.credential;
//         console.log(errorCode, errorMessage, email, credential);
//       });
//     })
//   });