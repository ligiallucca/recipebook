let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {

    let getPostsBD = () => {
        database.ref('/posts/'+ USER_ID).once('value')
        .then((snapshot)  => {
            snapshot.forEach((childSnapshot)  => {
                
                let childKey = childSnapshot.key;
                let childtitle = childSnapshot.val().title;
                let childIngredients = childSnapshot.val().ingredients;
                let childText = childSnapshot.val().text;
                let childDate = childSnapshot.val().date;
                let childMethod = childSnapshot.val().postMessage;
                let childLike = childSnapshot.val().likes;
                
                createListPost(childtitle, childIngredients, childText, childDate, childMethod, childLike, childKey);
            })
        })
    }    
    getPostsBD()
    
    $('#post-text').on('keyup', () => {
        $('#send-button').prop('disabled', $('#post-text').val().length < 1);
    });
    $("#send-button").click(addPostsClick);
    
    // $("#post-text").change('keyup', () => {
    //     while ($("#post-text").scrollHeight > $("#post-text").offsetHeight)
    //     {
    //         $("#post-text").rows += 1;
    //     }
    // });
});

let date = () => {
    let dNow = new Date();
    let localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    return localdate;
}

let addPostsClick = (event) => {
    event.preventDefault();
    $('#send-button').attr('disabled', true);
    let titlePost = $("#title-recipe").val();
    let ingredientsPost = $("#ingredients").val();
    let newPost = $("#post-text").val();
    let newDate = date();
    let methodPost = $("[name=method-post]:checked").val();
    let like = 0;
    $("#title-recipe").val("");
    $("#ingredients").val("");
    $("#post-text").val("");
    let postBD = addPostsBD(titlePost, ingredientsPost, newPost, newDate, methodPost, like);
    let postKey = postBD.getKey();
    
    // createListPost(titlePost, ingredientsPost, newPost, newDate, methodPost, postKey)
}

let addPostsBD = (titlePost, ingredientsPost, text, newDate, methodPost, like) => {
    return database.ref("posts/" + USER_ID).push({
        title: titlePost,
        ingredients: ingredientsPost,
        text: text,
        date: newDate,
        postMessage: methodPost,
        likes: like
    });
}

let createListPost = (titlePost, ingredientsPost, text, date, methodPost, likes, key) => {
    $("#post-list").prepend(`
    <li class="card my-4" data-new-post=${key}>
        <h5 class="card-header"> ${titlePost} </h5>
        <p class="card-body" data-ingredients-id=${key}> ${ingredientsPost} </p>
        
        <div class="container mb-4">
            <button type="button"
                class="btn btn-block btn-primary"
                data-toggle="modal"
                data-target="#modal-recipe-show">
                Receita
            </button>

            <button
                data-like-id=${key}
                data-like-counter=${likes || 0}
                class="btn btn-block btn-primary">
                ${likes} Like
            </button>
            
            <button class="btn btn-block btn-primary" data-edit-id=${key}>
                Editar
            </button>
        
            <button
                type="button"
                class="btn btn-block btn-primary" 
                data-toggle="modal" 
                data-target="#modal-delete-post-${key}">
                Excluir
            </button>
        </div>

        <footer class="card-footer">
            <span date=${key}> Postado em ${date} </span>
            <span>- Modo ${methodPost}</span>
        </footer class="card-footer">

        <div id="modal-show-recipe">
            <div
                class="modal fade"
                id="modal-recipe-show"
                tabindex="-1"
                role="dialog"
                aria-labelledby="modal-recipe-showTitle"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modal-recipe-showTitle"> ${titlePost} </h5>
    
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
    
                            </div>
    
                            <div class="modal-body"> 
                                <p>${ingredientsPost}</p>
                                <p>${text}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div
            class="modal fade"
            id="modal-delete-post-${key}"
            tabindex="-1"
            role="dialog"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Excluir receita </h5>
    
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
    
                    </div>
    
                    <div class="modal-body"> 
                        <p>Opa! Você tem certeza que deseja excluir esta receita deliciosa?</p>
                    </div>
    
                    <div class="modal-footer">
                        <button class="btn color-primary"
                            data-delete-id=${key}>
                            Excluir
                        </button>
                        <button class="btn color-secondary pull-right"
                            data-dismiss="modal">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </li>`);

    $(`button[data-delete-id="${key}"]`).click(() => {
        database.ref("posts/" + USER_ID + "/" + key).remove();
        let thisPost = $(`li[data-new-post="${key}"]`);
        thisPost.remove();
        window.location.reload();   
    });
    
    $(`button[data-like-id="${key}"]`).click(() => {
        let thisButton = $(`button[data-like-id="${key}"]`);
        let counter = thisButton.data('like-counter');
        counter++;
        database.ref("posts/" + USER_ID + "/" + key).update({
            likes: counter
        });
        thisButton.html(counter + " likes");
        thisButton.data('like-counter', counter);
    });
    
    $(`button[data-edit-id="${key}"]`).click(() => {
        let newText = prompt(`Altere o seu texto aqui: ${text}`);
        if (newText === ""){
            alert("Texto não pode ficar vazio")
        } if (newText.length > 0){
            $(`span[data-text-id=${key}]`).text(newText);
            database.ref("posts/" + USER_ID + "/" + key).
            update({
                text: titlePost,
                text: ingredientsPost,
                text: newText
            }) 
        }
    });
}

$('#filter-posts').change((event) => {
    database.ref('/posts/'+ USER_ID).once('value')
    .then((snapshot) => {
        $("#post-list").html("");
        snapshot.forEach((childSnapshot) => {
            let childKey = childSnapshot.key;
            let childtitlePost = childSnapshot.val().title;
            let childIngredientsPost = childSnapshot.val().ingredients;
            let childData = childSnapshot.val().text;
            let childDate = childSnapshot.val().date;
            let childMethod = childSnapshot.val().postMessage;
            let childLike = childSnapshot.val().likes;
            
            if (event.target.value === childMethod){
                createListPost(childtitlePost, childIngredientsPost, childData, childDate, childMethod, childLike, childKey);
            } else if(event.target.value === "todos") {
                createListPost(childtitlePost, childIngredientsPost, childData, childDate, childMethod, childLike, childKey);
            }
        })
        
    });
    
})

$("#exit").click((event) => {
    event.preventDefault();
    
    firebase.auth().signOut().then(() => {
        window.location = "index.html";
    }).catch((error) => {
        alert("Erro: " + error);
    });
});

 
    // <div>
    // <li>
    // <div class="card" style="width: 30rem;">
    // <div class="card-body">
    // <div>
    // <span data-text-id=${key}>${text}</span>
    // </div>
    // <span teste=${key}>${date}</span>
    // <div>
    // // <span>
    // <button data-like-id=${key} data-like-counter=${likes || 0} class="btn btn-primary">${likes} Like</button>
    // </span>
    // <span>
    // <button class="btn btn-primary" data-edit-id=${key}>Editar</button>
    // </span>
    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal + ${key}">
    // Excluir
    // </button>
    // </div>
    // <span>Postado em modo ${methodPost}</span>
    // <div class="modal fade" id="modal + ${key}" tabindex="-1" role="dialog" aria-labelledby="modal-delete-post" aria-hidden="true">
    // <div class="modal-dialog modal-dialog-centered" role="document">
    // <div class="modal-content">
    // <div class="modal-header">
    // <h5 class="modal-title" id="modal-delete-post">Excluir Publicação</h5>
    // <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    // <span aria-hidden="true">&times;</span>
    // </button>
    // </div>
    // <div class="modal-body">
    // Deseja mesmo excluir esta publicação? Depois de excluido não é possível recuperar as informações novamente.
    // </div>
    // <div class="modal-footer">
    // <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
    // <button type="button" class="btn btn-primary" btn-ok  data-delete-id=${key}>Apagar Publicação</button>
    // </div>
    // </div>
    // </div>
    // </div>   
    // </div>
    // </div>
    // </li>
    // </div>
    // `);


    // <span class="card-text" data-text-id=${key}> ${text} </span>