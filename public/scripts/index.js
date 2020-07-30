// const createCardElement = function(map_id) {
  // const { user, content, created_at } = card;
  // const xssSafe = escape(content.text);
//   let $card = `<div class="card">
//   <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 200px">
//     <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
//       style="border:0" allowfullscreen></iframe>
//   </div>
//   <form class="form-inline my-2 my-lg-0" id = "mapPage" action ="/map/${map_id}" method="POST">
//     <button class="GoToMap" type="submit">More</button>
//   </form>
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//   </div>
//   <div class="card-footer">
//     <small class="text-muted">Last updated 3 mins ago</small>
//   </div>
// </div>`;
//   return $card;
// };


const createCardElement = function(map_id, longitude, latitude, title, description) {
  // const { user, content, created_at } = card;
  // const xssSafe = escape(content.text);
  let $card = `<div class="card">
  <img class="card-img-top" src="https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=11&apiKey=9957cdced17242a3b22931a4118f36ba" alt="Static Map Holder">
  <form class="form-inline my-2 my-lg-0" id = "mapPage" action ="/map/${map_id}" method="POST">
    <button class="GoToMap" type="submit">Expand</button>
  </form>
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
  </div>
  <div class="card-footer">
    <small class="text-muted"></small>
  </div>
  </div>`;
  return $card;
};





//res == {pinid: {id:1, map_id: 1, maptitle: something, mapdes: something, username: someone, lattitude: 1, longitude: 1, pinnote: somenote}}
$(document).ready(() => {
  let maps = {};
  $.ajax({
    method:"GET",
    url:"/load"
  }).done(res => {
    for (pin in res) {
      if (!maps[res[pin].mapid]) {
        maps[res[pin].mapid] ={map_id: res[pin].mapid, lng: res[pin].longitude, lat: res[pin].latitude, title: res[pin].maptitle, des:res[pin].mapdes};
      }
    }
    console.log(maps);
    //this is where the loading needs to happen
    for (map in maps) {

      $('.card-columns').append(createCardElement(maps[map].map_id, maps[map].lng, maps[map].lat, maps[map].title, maps[map].des));
    }
    console.log("before click");
    $("button.GoToMap").click(() =>{
      console.log("clicked");
      $.ajax({
        method:"GET",
        url:"/map"
      }).done(res =>{
        window.location.replace("/map");
        // console.log("takenn");
      });
    });

  });

});





// $.ajax({
//   method: "GET",
//     url: "/map/???"
// }).done((res)=>{

// })

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
