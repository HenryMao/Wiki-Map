
const addtoList = function(map_id) {
  let $item = `<li>
    <form class="form-inline my-2 my-lg-0" id = "favMap" action ="/map/${map_id}" method="POST">
      <button class="GoMap" style = "border-style: none" type="submit">Map#${map_id}</button>
    </form>
    </li>`
  return $item;
};
let maps = {};
$(document).ready(()=>{
  $.ajax({
    method: "GET",
    url: "/like"
  }).done(res =>{
    for(let map in res){
      if(res[map].username === $("#nameDisplay").text()){
        $("#favList").append(addtoList(res[map].id));
      }
    }
    // console.log("before clicking");
    // $("button.GoMap").on("click",()=>{
    //   $.ajax({
    //     method:"GET",
    //     url:"/map"
    //   }).done(res =>{
    //     window.location.replace("/map");
    //   });
    // })
    $.ajax({
      method:"GET",
      url:"/load"
    }).done(res =>{
      for (pin in res) {
        if (!maps[res[pin].mapid] && res[pin].username === $("#nameDisplay").text()) {
          maps[res[pin].mapid] = res[pin].mapid;
        }
      }
      //this is where the loading needs to happen
      for (map in maps) {
        $('#creList').append(addtoList(maps[map]));
      }
      $("button.GoMap").on("click",()=>{
        $.ajax({
          method:"GET",
          url:"/map"
        }).done(res =>{
          window.location.replace("/map");
        });
      })
    })
  })

})
