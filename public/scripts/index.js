$(document).ready(() => {
  $("#card1").click(() => {
    $.ajax({
      method: "GET",
        url: "/map"
    }).done((res)=>{
      window.location.replace("/map");
    })
  })
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
  $("#loginButton").on("click", function(event) {
    event.preventDefault();
    $("#dropHeader").slideDown(400);
  })


})
