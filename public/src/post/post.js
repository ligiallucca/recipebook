let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    getPostsBD();
    
    $('#post-text').on('keyup', function(){
        $('#send-button').prop('disabled', $('#post-text').val().length < 1);
    });
    $("#send-button").click(addPostsClick);
});

$("#post-text").change('keyup',size);
function size(){
    while ($("#post-text").scrollHeight > $("#post-text").offsetHeight)
    {
        $("#post-text").rows += 1;
    }
}

function date(){
    let dNow = new Date();
    let localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    return localdate;
}

function addPostsClick(event){
    event.preventDefault();
    $('#send-button').attr('disabled', true);
    let newPost = $("#post-text").val();
    $("#post-text").val("");
    let newDate = date();
    let methodPost = $("#method-post").val();
    let like = 0;
    // let likes = $(button[data-like-id="${key}).val();
    let postBD = addPostsBD(newPost, newDate, methodPost, like);
    let postKey = postBD.getKey();
    
    createListPost(newPost, postKey, newDate, methodPost, like)    
}    

function addPostsBD(text, newDate, methodPost, like){
    return database.ref("posts/" + USER_ID).push({
        text: text,
        date: newDate,
        postMessage: methodPost,
        likes: like
    });
}

function getPostsBD(){
    database.ref('/posts/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val().text;
            let childDate = childSnapshot.val().date;
            let childMethod = childSnapshot.val().postMessage;
            let childLike = childSnapshot.val().likes;
            
            createListPost(childData, childKey, childDate, childMethod, childLike);
        });
    });
}

function createListPost(text, key, date, methodPost, likes){
    $("#post-list").prepend(`
    <div>
    <li>
    <div class="card" style="width: 30rem;">
    <div class="card-body">
    <div>
    <span data-text-id=${key}>${text}</span>
    </div>
    <span teste=${key}>${date}</span>
    <div>
    <span>
    <button data-like-id=${key} data-like-counter=${likes || 0} class="btn btn-primary">${likes} Like</button>
    </span>
    <span>
    <button class="btn btn-primary" data-edit-id=${key}>Editar</button>
    </span>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal + ${key}">
    Excluir
    </button>
    </div>
    <span>Postado em modo ${methodPost}</span>
    <div class="modal fade" id="modal + ${key}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalCenterTitle">Excluir Publicação</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    Deseja mesmo excluir esta publicação? Depois de excluido não é possível recuperar as informações novamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" btn-ok  data-delete-id=${key}>Apagar Publicação</button>
    </div>
    </div>
    </div>
    </div>   
    </div>
    </div>
    </li>
    </div>
    `);
    
    $(`button[data-delete-id="${key}"]`).click(function(){
        database.ref("posts/" + USER_ID + "/" + key).remove();
        $(this).parent().remove();
        window.location.reload();   
    });
    
    $(`button[data-like-id="${key}"]`).click(function(){
        let counter = $(this).data("like-counter");
        counter += 1;
        $(this).data("like-counter", counter);
        $(this).html(counter + " likes");
        database.ref("posts/" + USER_ID + "/" + key).
            update({
                likes: counter
            }) 
    });
    
    $(`button[data-edit-id="${key}"]`).click(function(){
        let newText = prompt(`Altere o seu texto aqui: ${text}`);
        if (newText === ""){
            alert("Texto não pode ficar vazio")
        } if (newText.length > 0){
            $(`span[data-text-id=${key}]`).text(newText);
            database.ref("posts/" + USER_ID + "/" + key).
            update({
                text:newText
            }) 
        }
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

