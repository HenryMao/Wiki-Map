$(document).ready(() => {
  $("#homeButton").click(() => {
    $.ajax({
      method: "GET",
        url: "/"
    }).done((res)=>{
      console.log("homebutton");
      console.log(res);
    })
  })
  $("#mapButton").click(() => {
    $.ajax({
      method: "GET",
        url: "/map"
    }).done((res)=>{
      console.log("mapbutton");
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  })
})
