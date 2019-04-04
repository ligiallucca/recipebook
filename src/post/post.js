let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    getPostsBD();
    $("#send-button").click(addPostsClick);
});

function getPostsBD(){
    database.ref('/users/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            if (childData.text != undefined){
            createListPost(childData.text, childKey);
        }
        });
    });
}

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

function createListPost(text, key){
<<<<<<< Updated upstream:src/post/post.js
    console.log(text,key)
    $("#post-list").append(`
    <li>
    <span>${text}</span>
    <button class="delete-button" data-id=${key}>Excluir</button>
    </li>
    `);

    $(`button[data-id="${key}"]`).click(function(){
        database.ref("users/" + USER_ID + "/" + key).remove();
        $(this).parent().remove();
        });
=======
$("#post-list").append(`
<li>
<span data-text-id="${key}">${text}
</span>
<span>
<button data-edit-id=${key}>Editar</button>
</span>
<button data-delete-id=${key}>Excluir</button>
</li>
`);

$(`button[data-delete-id="${key}"]`).click(function(){
    database.ref("posts/" + USER_ID + "/" + key).remove();
    $(this).parent().remove();
});

$(`button[data-edit-id="${key}"]`).click(function(){
    let newText = prompt(`Altere o seu texto aqui: ${text}`);
    $(`span[data-text-id=${key}]`).text(newText);
    database.ref("posts/" + USER_ID + "/" + key).
    update({
        text:newText
    })
   
    
});

>>>>>>> Stashed changes:public/src/post/post.js
}
