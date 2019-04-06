let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];
let btnSend = $("#send-button");
let textPost = $("#post-text");

$(document).ready(function(){
    getPostsBD();
    
    textPost.keyup(function() {
        if(textPost.val() === ""){
            btnSend.attr("disabled", true);
        }else{
            btnSend.attr("disabled", false);
        }
    });

    btnSend.click(addPostsClick);
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
    let newPost = textPost.val();
    let postBD = addPostsBD(newPost);
    let postKey = postBD.getKey();
    
    createListPost(newPost, postKey)
}    

function addPostsBD(text){
    return database.ref("posts/" + USER_ID).push({
        text: text
    });
}

textPost.on('keyup',size)
function size(){
    while (textPost.scrollHeight > textPost.offsetHeight)
    {
        textarea.rows += 1;
    }
}

function createListPost(text, key, likes){
    $("#post-list").append(`
    <article>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <p data-text-id=${key}>${text}</p>
    <span>
    <button data-edit-id=${key}>Editar</button>
    </span>
    <span>
    <button data-delete-id=${key}>Excluir</button>
    </span>
    <span>
    <button data-like-id=${key} data-like-counter=${likes || 0}> Like</button>
    </span>
    </div>
    </div>
    </article>
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

// function date(){
//     let dNow = new Date();
//     let localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
//     return localdate;
// }

$("#exit").click(function (event) {
    event.preventDefault();
    
    firebase.auth().signOut().then(function() {
        window.location = "../../index.html";
    }).catch(function(error) {
        alert("Erro: " + error);
    });
});

