//helper function for adding favorite map links and created map links
const addtoList = function(map_id, title) {
  let $item = `<li>
    <form class="form-inline my-2 my-lg-0" id = "favMap" action ="/map/${map_id}" method="POST">
      <button class="GoMap" style = "border-style: none" type="submit">Map#${map_id}: ${title}</button>
    </form>
    </li>`;
  return $item;
};
//create an empty object to capture unique maps
let maps = {};
let fav = {};
let displayFav = {};
$(document).ready(()=>{
  //make an ajax request to load all maps
  $.ajax({
    method: "GET",
    url: "/like"
  }).done(resFav =>{

    //another ajax get request in series to get the entire pins table
    $.ajax({
      method:"GET",
      url:"/load"
    }).done(res =>{

      //filter out the maps that arent liked by the current user
    for (let map in resFav) {
      if (resFav[map].username === $("#nameDisplay").text()) {
        fav[resFav[map].id] = resFav[map].id;
      }
    }
      //loop through the response to find maps created by the current user
      for (pin in res) {
        if (!maps[res[pin].mapid] && res[pin].username === $("#nameDisplay").text()) {
          maps[res[pin].mapid] = {mapid: res[pin].mapid, title: res[pin].maptitle};
        }
      }
      //assigning display fav to get info in unit of maps
      for (pin in res) {
        if(res[pin].mapid === fav[res[pin].mapid]){
          displayFav[res[pin].mapid] = {map: res[pin].mapid, title: res[pin].maptitle};
        }

      }

      for(let i in displayFav){
        //adding to fav list
        $("#favList").append(addtoList(displayFav[i].map, displayFav[i].title));
      }

      //add the created maps to the list using the helper function addtolist
      for (map in maps) {
        $('#creList').append(addtoList(maps[map].mapid, maps[map].title));
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
