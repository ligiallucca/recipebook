let database = firebase.database();

$(document).ready(function(){
    $("#send-button").click(function(event){
        event.preventDefault();

        let text = $("#post-input").val();
        $("#post-input").val("");
        $("#post-list").append(`<li>${text}</li>`);

        database.ref('posts/' + "123").set({
            text: text,
            email: email,
            profile_picture : imageUrl
          });
    })
});