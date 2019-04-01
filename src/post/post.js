let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    database.ref('/users/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            $("#post-list").append(`<li>${childData.text}</li>`);
        });
    });
    //let username = (snapshot.val() && snapshot.val().username)
});
$("#send-button").click(function(event){
    event.preventDefault();
    
    let text = $("#post-input").val();

    $("#post-input").val("");
    $("#post-list").append(`<li>${text}</li>`);
    
    database.ref('users/' + USER_ID).push({
        text: text   
    });
});