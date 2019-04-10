$(document).ready(function(){
    database.ref("users/"+USER_ID).once("value")
    .then(function(snapshot){
        let userInfo = snapshot.val();
        $("#welcome-name").text(userInfo.name)
    })
})