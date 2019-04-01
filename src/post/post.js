let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
   getPostsBD();
   $("#send-button").click(addPostsClick);
});

function addPostsClick(event){
   event.preventDefault();

   let newPost = $("#post-input").val();
    $("#post-input").val("");
    let postBD = addPostsBD(newPost);
    let postKey = postBD.getKey();
    
    createListPost(newPost, postKey)
}

function addPostsBD(text){
   return database.ref("users/" + USER_ID).push({
       text: text
   });
}

function getPostsBD(){
    database.ref('/users/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            
            createListPost(childData.text, childKey);
        });
    });         
}

function createListPost(text, key){
    $("#post-list").append(`
    <li>
    <span>${text}</span>
    <button class="delete-button" data-id=${key}>Excluir</button>
    </li>
    `);
    
    $(`button[data-id="${key}"]`).click(function(){
        database.ref(key).remove();
        $(this).parent().remove();
    });
}

   $(`button[data-id="${key}"]`).click(function(){
       database.ref("users/" + USER_ID + "/" + key).remove();
       $(this).parent().remove();
   });
}
