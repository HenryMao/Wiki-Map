$(document).ready(() => {
  let maps = {};
  $.ajax({
    method:"GET",
    url:"/load"
  }).done(res => {
    for(pin in res){
      if (!maps[res[pin].mapid]) {
        maps[res[pin].mapid] = 1;
      }

    }
    console.log(maps);

  })


  // $("#card1").click(() => {
  //   $.ajax({
  //     method: "GET",
  //       url: "/map"
  //   }).done((res)=>{
  //     window.location.replace("/map");
  //   })

  // $("#mapButton").click(() => {
  //   $.ajax({
  //     method: "GET",
  //       url: "/map"
  //   }).done((res)=>{

  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // })

  // $("#login").on("submit", function(event) {
  //   event.preventDefault();
  //   $("#dropHeader").slideDown(400);
  //   $("#greetings").prepend(`<h2>Hi ${$("#usernameField").val()}!</h2>`);

  //   $("#usernameField").hide();
  //   $("#profileLink").show();

  //   $("#nameDisplay").text(`${$("#usernameField").val()}`);
  //   $.ajax({
  //     method:"POST",
  //     url: "/login",
  //     data: {user:$("#usernameField").val()}
  //   })
  // })



})

