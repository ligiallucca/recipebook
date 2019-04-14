'use strict';

const database = firebase.database();

$(document).ready(() => {
    const forms = $(".needs-validation");
    forms.filter(form => {
      form.addEventListener('submit', event => {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');

        event.preventDefault();
        const email = $("[data-id-email='data-email']").val();
        const password = $("[data-id-password='data-password']").val();
        const name = $("[data-id-name='data-name-user']").val();
        const lastname = $("[data-id-last-name='data-last-name-user']").val();
        const username = $("[data-id-username='data-username']").val();
        const birthday = $("[data-id-birthday='data-birthday']").val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
          database.ref(`users/${response.user.uid}`).update({
            name,
            lastname,
            username,
            birthday
          });
          window.location = `post.html?id=${response.user.uid}`
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
      })
    });
  });
})
