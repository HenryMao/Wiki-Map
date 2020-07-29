$(document).ready(() => {



  const data = [
  {name: 'card1'},
  {name: 'card2'},
  {name: 'card3'},
  {name: 'card4'},
  {name: 'card5'}

]

  const createCardElement = function(card) {
    // const { user, content, created_at } = card;
    // const xssSafe = escape(content.text);
    let $card = `<div class="card">
    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 200px">
      <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
        style="border:0" allowfullscreen></iframe>
    </div>
    <form class="form-inline my-2 my-lg-0" id = "mapPage" action ="/map" method="GET">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">More</button>
    </form>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>`;

    return $card;
  };

const renderCards = (data)=>{
  data.forEach((item)=>{
    $('.card-columns').append(createCardElement(item))
  })
}

renderCards(data)

})



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
