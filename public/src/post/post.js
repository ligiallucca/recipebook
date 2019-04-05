let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    getPostsBD();
    $("#send-button").click(addPostsClick);
});

function getPostsBD(){
    
    database.ref('/posts/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            
            createListPost(childData.text, childKey);
        });
    });
    
}

function addPostsClick(event){
    event.preventDefault();

    let newPost = $("#post-text").val();
    let postBD = addPostsBD(newPost);
    let postKey = postBD.getKey();
    
    createListPost(newPost, postKey)
}

function addPostsBD(text){
   return database.ref("posts/" + USER_ID).push({
       text: text
   });
}

function createListPost(text, key, likes){
$("#post-list").append(`
<li>
<span data-text-id="${key}">${text}
</span>
<span>
<button data-edit-id=${key}>Editar</button>
</span>
<span>
<button data-delete-id=${key}>Excluir</button>
</span>
<span>
<button data-like-id=${key} data-like-counter=${likes || 0}>Like</button>
</span>

</li>
`);

$(`button[data-delete-id="${key}"]`).click(function(){
    database.ref("posts/" + USER_ID + "/" + key).remove();
    $(this).parent().parent().remove();
});

$(`button[data-like-id="${key}"]`).click(function(){

    let counter = $(this).data("like-counter");
    counter += 1;
    $(this).data("like-counter", counter);
    $(this).html(counter + "likes")
});

$(`button[data-edit-id="${key}"]`).click(function(){
    let newText = prompt(`Altere o seu texto aqui: ${text}`);
    $(`span[data-text-id=${key}]`).text(newText);
    database.ref("posts/" + USER_ID + "/" + key).
    update({
        text:newText
    })
   
    
});

}

$("#exit").click(function (event) {
    event.preventDefault();

    firebase.auth().signOut().then(function() {
        window.location = "../../index.html";
    }).catch(function(error) {
        alert("Erro: " + error);
    });
});

