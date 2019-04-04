const database = firebase.database();

$(document).ready(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
    var forms = document.getElementsByClassName('needs-validation');
    // Faz um loop neles e evita o envio
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');

      event.preventDefault();
      let email = $("[data-id-email = 'data-email']").val();
      let password = $("[data-id-password ='data-password']").val();
      let name = $("[data-id-name='data-name-user']").val();
      let lastname = $("[data-id-last-name = 'data-last-name-user']").val();
      let username = $("[data-id-username ='data-username']").val();
      let birthday = $("[data-id-birthday = 'data-birthday']").val();
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(response){
        database.ref(`users/${response.user.uid}`).update({
          name: name,
          lastname: lastname,
          username: username,
          birthday: birthday
        })
        window.location = `/public/src/post/post.html?id=${response.user.uid}`
      })  .catch(function() {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorCode, errorMessage);
            if (name === ""){
              $("#feedback-name").html("Campo não pode ficar vazio");
              $("[data-id-name='data-name-user']").addClass("is-invalid");
            }
    }, false);
    });
  }, false);
});  

// $("#register-button").click(function(event) {
//   event.preventDefault();
  
//   let email = $("[data-id-email = 'data-email']").val();
//   let password = $("[data-id-password ='data-password']").val();
//   let name = $("[data-id-name='data-name-user']").val();
//   let lastname = $("[data-id-last-name = 'data-last-name-user']").val();
//   let username = $("[data-id-username ='data-username']").val();
//   let birthday = $("[data-id-birthday = 'data-birthday']").val();
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then(function(response){
//     database.ref(`users/${response.user.uid}`).update({
//       name: name,
//       lastname: lastname,
//       username: username,
//       birthday: birthday
//     })
//     window.location = `/public/src/post/post.html?id=${response.user.uid}`
//   })  
//   .catch(function() {
//     // let errorCode = error.code;
//     // let errorMessage = error.message;
//     // alert(errorCode, errorMessage);
//     // if (name === ""){
//     //   $("#feedback-name").html("Campo não pode ficar vazio");
//     //   $("[data-id-name='data-name-user']").addClass("is-invalid");
//     // }
//   });
// })
