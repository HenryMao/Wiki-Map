//helper function for adding favorite map links and created map links
const addtoList = function(map_id) {
  let $item = `<li>
    <form class="form-inline my-2 my-lg-0" id = "favMap" action ="/map/${map_id}" method="POST">
      <button class="GoMap" style = "border-style: none" type="submit">Map#${map_id}</button>
    </form>
    </li>`;
  return $item;
};
//create an empty object to capture unique maps
let maps = {};
$(document).ready(()=>{
  //make an ajax request to load all maps
  $.ajax({
    method: "GET",
    url: "/like"
  }).done(res =>{
    //filter out the maps that arent liked by the current user
    //add to the fav list with helper function addtolist
    for (let map in res) {
      if (res[map].username === $("#nameDisplay").text()) {
        $("#favList").append(addtoList(res[map].id));
      }
    }
    //another ajax get request in series to get the entire pins table
    $.ajax({
      method:"GET",
      url:"/load"
    }).done(res =>{
      //loop through the response to find maps created by the current user
      for (pin in res) {
        if (!maps[res[pin].mapid] && res[pin].username === $("#nameDisplay").text()) {
          maps[res[pin].mapid] = res[pin].mapid;
        }
      }
      //add the created maps to the list using the helper function addtolist
      for (map in maps) {
        $('#creList').append(addtoList(maps[map]));
      }
      //each list item takes user to the appropriate map page
      $("button.GoMap").on("click",()=>{
        $.ajax({
          method:"GET",
          url:"/map"
        }).done(res =>{
          window.location.replace("/map");
        });
      });
    });
  });

});
