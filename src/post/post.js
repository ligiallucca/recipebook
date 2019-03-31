let database = firebase.database();

$(document).ready(function(){
    database.ref('/posts/').once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            createPost(childData.text, childKey)
           // $("#post-list").append(`<li>${childData.text}</li>`)
          
        });
        });
        //let username = (snapshot.val() && snapshot.val().username)
    });
    $("#send-button").click(function(event){
        event.preventDefault();

        let text = $("#post-input").val();
        $("#post-input").val("");
        
        let newPostKey = database.ref('posts').push({
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