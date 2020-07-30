//helper function for creating map previews
const createCardElement = function(map_id, longitude, latitude, title, description, user) {
  // const { user, content, created_at } = card;
  // const xssSafe = escape(content.text);
  let $card = `<div class="card">
  <img class="card-img-top" src="https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${longitude},${latitude}&zoom=11&apiKey=9957cdced17242a3b22931a4118f36ba" alt="Static Map Holder">
  <div class="buttonDivHome">
    <form class="form-inline my-2 my-lg-0" id = "mapPage" action ="/map/${map_id}" method="POST">
<<<<<<< HEAD

      <button type="submit" class="btn btn-info btn-sm GoToMap m-1">Expand</button>
=======
      <button type="submit" class="btn btn-info btn-sm GoToMap mt-1 ml-1">Expand</button>
>>>>>>> 36bc4e4c749c6ac4bbbc96653388c0b2b2071b9e
    </form>
    <form class="form-inline my-2 my-lg-0" id = "mapPage" action ="/like/${user}/${map_id}" method="POST">
<<<<<<< HEAD

      <button type="submit" class="btn btn-info btn-sm like m-1" >Like</button>
=======
      <button type="submit" class="btn btn-info btn-sm like mt-1 mr-1" >Like</button>
>>>>>>> 36bc4e4c749c6ac4bbbc96653388c0b2b2071b9e
    </form>

  </div>
  <div class="card-body">

    <h5 class="card-title">${title}</h5>
    <h6 class="card-text">Map#${map_id}</h6>
    <p class="card-text">${description}</p>
  </div>
  <div class="card-footer">
    <small class="text-muted"></small>
  </div>
  </div>`;
  return $card;
};


$(document).ready(() => {
  let maps = {};
  //first loads the entire pins table from database
  $.ajax({
    method:"GET",
    url:"/load"
  }).done(res => {
    //res contains an object with all pins information
    //looping through to find unique map ids and store in empty object maps
    for (pin in res) {
      if (!maps[res[pin].mapid]) {
        maps[res[pin].mapid] = {map_id: res[pin].mapid, lng: res[pin].longitude, lat: res[pin].latitude, title: res[pin].maptitle, des:res[pin].mapdes};
      }
    }
    //for each map we create a map preview using the helper function defined above
    for (map in maps) {
      //console.log(maps[map]);
      $('.card-columns').append(createCardElement(maps[map].map_id, maps[map].lng, maps[map].lat, maps[map].title, maps[map].des, $("#nameDisplay").text()));
    }
    //each button of expand takes the user to the appropriate map view page
    $("button.GoToMap").click(() =>{
      $.ajax({
        method:"GET",
        url:"/map"
      }).done(res =>{
        window.location.replace("/map");
      });
    });


  });

});
