let database = firebase.database();

$(document).ready(function(){
    database.ref('/posts/').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            //var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData.text)//to fix
            $("#post-list").append(`<li>${childData.text}</li>`)
            // ...
          });
        });
        //let username = (snapshot.val() && snapshot.val().username)
    });
    $("#send-button").click(function(event){
        event.preventDefault();

        let text = $("#post-input").val();
        $("#post-input").val("");
        $("#post-list").append(`<li>${text}</li>`);

        database.ref('posts/').push({
            text: text   
        });
    });