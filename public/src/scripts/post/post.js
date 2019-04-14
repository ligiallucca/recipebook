const database = firebase.database();
const USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function() {
    getPostsBD();

    $('#post-text').on('keyup', () => {
        $('#send-button').prop('disabled', $('#post-text').val().length < 1);
    });

    $("#send-button").click(addPostsClick);
});

const getPostsBD = () => {
    database.ref(`posts/${USER_ID}`).once('value')
    .then(snapshot => {
        snapshot.forEach((childSnapshot)  => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            createListPost(data, key);
        })
    })
}

const date = () => {
    const dNow = new Date();
    return `${dNow.getDate()}/${dNow.getMonth() + 1}/${dNow.getFullYear()} ${dNow.getHours()}:${dNow.getMinutes()}`;
}

const addPostsClick = event => {
    event.preventDefault();
    const postData = {
      title: $("#title-recipe").val(),
      ingredients: $("#title-recipe").val(),
      text: ("#post-text").val(),
      data: date(),
      postMessage: $("[name=method-post]:checked").val(),
      like: 0
    };
    const postBD = addPostsBD(postData);
    const postKey = postBD.getKey();

    createListPost(postData, postKey)

    $('#send-button').attr('disabled', true);
    $("#title-recipe").val("");
    $("#ingredients").val("");
    $("#post-text").val("");
}

const addPostsBD = (data) => {
    return database.ref(`posts/${USER_ID}`).push({...data});
}

const createListPost = (postData, key) => {
    $("#post-list").prepend(`
    <li class="card my-4" data-new-post=${key}>
        <h5 class="card-header"> ${postData.title} </h5>
        <p class="card-body" data-ingredients-id=${key}> ${postData.ingredients} </p>

        <div class="container mb-4">
            <button type="button"
                class="btn btn-block btn-primary color-primary"
                data-toggle="modal"
                data-target="#modal-recipe-show">
                Ver a Receita Completa
            </button>

            <button
                data-like-id=${key}
                data-like-counter=${postData.like || 0}
                class="btn btn-block btn-primary">
                ${postData.like} Like
            </button>

            <button class="btn btn-block btn-primary" data-edit-id=${key}>
                Editar
            </button>

            <button
                type="button"
                class="btn btn-block btn-primary"
                data-toggle="modal"
                data-target="#modal + ${key}">
                Excluir
            </button>
            <div class="modal fade" id="modal + ${key}" tabindex="-1" role="dialog" aria-labelledby="modal-delete" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="modal-delete">Excluir Publicação</h5>
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

        <footer class="card-footer">
            <span date=${key}> Postado em ${postData.date} </span>
            <span>- Modo ${postData.postMessage}</span>
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
                            <h5 class="modal-title" id="modal-recipe-showTitle"> ${postData.title} </h5>

                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                            </div>

                            <div class="modal-body">
                                <p>${postData.ingredients}</p>
                                <p>${postData.text}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </li>`);

    $(`button[data-delete-id="${key}"]`).click(() => {
        database.ref(`posts/${USER_ID}/${key}`).remove();
        $(this).parent().remove();
        window.location.reload(); //precisava atualizar a tela tem reload
    });

    $(`button[data-like-id="${key}"]`).click(() => {
        const counter = parseInt($(this).data('like-counter')) + 1;
        database.ref(`posts/${USER_ID}/${key}`).update({
            like: counter
        });
        $(this).html(counter + " likes");
        $(this).data('like-counter', counter);
    });

    $(`button[data-edit-id="${key}"]`).click(() => {
        const newText = prompt(`Altere o seu texto aqui: ${text}`);
        if (newText === ""){
            alert("Texto não pode ficar vazio")
        } else if (newText.length > 0){
            $(`span[data-text-id=${key}]`).text(newText);
            database.ref(`posts/${USER_ID}/${key}`).update({text: newText});
            window.location.reload();
        }
    });
}

$('#filter-posts').change((event) => {
    database.ref(`posts/${USER_ID}`).once('value')
    .then(snapshot => {
        $("#post-list").html("");
        snapshot.forEach(childSnapshot => {
            const key = childSnapshot.key;
            const postData = childSnapshot.val();

            if (event.target.value === childMethod){
                createListPost(postData, key);
            } else if(event.target.value === "todos") {
                createListPost(postData, key);
            }
        })

    });

})

$("#exit").click((event) => {
    event.preventDefault();
    firebase.auth().signOut()
      .then(() => window.location = "index.html")
      .catch(error => alert("Erro: " + error));
});
