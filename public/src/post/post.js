let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    getPostsBD();
    
    $("#post-text").keyup(function() {
        if($("#post-text").length === ""){
            $("#send-button").attr("disabled", true);
        }else{
            $("#send-button").attr("disabled", false);
        }
    });

    $("#send-button").click(addPostsClick);
});

// $("#post-text").on('keyup',size);
//     function size(){
//         while ($("#post-text").scrollHeight > $("#post-text").offsetHeight)
//         {
//             $("#post-text").rows += 1;
//         }
//     }

function getPostsBD(){
    database.ref('/posts/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot)
            console.log(childSnapshot.val().date)
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val().text;
            let childDate = childSnapshot.val().date;
            
            if (childData.text != undefined){
                createListPost(childData, childKey, childDate);
            }
        });
    });
}

function date(){
    let dNow = new Date();
    let localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    return localdate;
}

function addPostsClick(event){
    event.preventDefault();
    let newPost = $("#post-text").val();
    $("#post-text").val("");
    let newDate = date();
    let postBD = addPostsBD(newPost, newDate);
    let postKey = postBD.getKey();
    
    createListPost(newPost, postKey, newDate)    
}    

function addPostsBD(text, newDate){
    return database.ref("posts/" + USER_ID).push({
        text: text,
        date: newDate
    });
}

function createListPost(text, key, date, likes){
    $("#post-list").append(`
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
                        <button data-like-id=${key} data-like-counter=${likes || 0} class="btn btn-primary"> Like</button>
                    </span>
                    <span>
                        <button class="btn btn-primary" data-edit-id=${key}>Editar</button>
                    </span>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal + ${key}">
                        Excluir
                    </button>
                    </div>
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
        $(this).html(counter + " likes")
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

