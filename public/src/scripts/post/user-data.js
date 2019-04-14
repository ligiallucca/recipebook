$(document).ready(function(){
    database.ref(`users/${USER_ID}`).once("value")
      .then(snapshot => {
          const userInfo = snapshot.val();
          $("#welcome-name").text(userInfo.name);
      })
      .catch(() => {
           $("#welcome-name").html("descubra novas receitas e compartilhe");
      });
})
