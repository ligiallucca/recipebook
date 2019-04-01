let database = firebase.database();
let USER_ID = window.location.search.match(/\?id=(.*)/)[1];

$(document).ready(function(){
    database.ref('/users/'+ USER_ID).once('value')
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            createPost(childData.text, childKey)
           // $("#post-list").append(`<li>${childData.text}</li>`)
          
        });
        });
    });
    $("#send-button").click(function(event){
        event.preventDefault();

        let text = $("#post-input").val();
        $("#post-input").val("");
        
        let newPostKey = database.ref('users/' + USER_ID).push({
            text: text   
        }); 

        console.log(newPostKey.key);
        
        createPost(text);
        //só para eu conseguir commitar =D
    });

    function createPost(text, key){
        $("#post-list").append(`
        <li>
            <span>${text}</span>
            <button class="delete-button" data-id="${key}">Excluir</button>
        </li>
        `);
    

    $(`button[data-id=${key}]`).click(function(){
        console.log(text);
    })
    }
