$(document).ready(function() {
  $("#trigger-js-carousel").owlCarousel({
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    itemsCustom : [
      [0, 2],     // menos de 450px mostra 2 itens
      [450, 4],   // em 450px mostra 4 itens
      [600, 7],   // em 600px mostra 7 itens
      [700, 9],   // em 700px mostra 9 itens
      [1000, 10], // em 1000px mostra 10 itens
      [1200, 12], // em 1200px mostra 12 itens
    ],
  });
  
  $("#enter-button").click(function(event) {
    event.preventDefault();
    
    let email = $("#user-email").val();
    let password = $("#user-password").val();
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(response){
      window.location = "/public/src/post/post.html?id=" + response.user.uid;
    })
    .catch(function() {
      if (email === ""){
        $("#invalid-email").html("O campo não pode ficar vazio.");
      } else if (email.search("@") === -1){
        $("#invalid-email").html("O formato de e-mail está inválido. \n Exemplo: usuario@gmail.com");      
      } else {
        $("#invalid-email").html("");
      } 
      
      if (password === ""){
        $("#invalid-email-password").html("O campo não pode ficar vazio.");
      } else {
        $("#invalid-email-password").html("E-mail ou senha inválidos.");
      }
    });          
  })
  
  $("#forget-password").click(function(){
    window.location = "/public/src/login/password.html"
  })
});