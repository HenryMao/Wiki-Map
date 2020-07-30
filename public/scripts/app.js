$(document).ready(function() {
  // ajax get request when the page loads to load specific map data
  $.ajax({
    method: "GET",
    url: "/map/specific"
  }).done((res) => {
    //initiates the map view upon the first successful ajax get request
    let mymap = L.map('map').setView([49.260761, -123.115662], 12);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
    }).addTo(mymap);
    //initiates useful variables for later marker placements
    let marker;
    let title;
    let mapdes;
    let popup;
    //loops through the response data and add each marker to the map in a for loop
    for (let pin in res) {
      marker = L.marker([res[pin].latitude, res[pin].longitude]);
      marker.addTo(mymap);
      let content = res[pin].pinnote;
      title = res[pin].maptitle;
      mapdes = res[pin].mapdes;
      let image = res[pin].imag;
      //prevents popup from loading an broken frame when no image url is passed in
      if (image) {
        popup = L.popup().setContent(`<h6 style ="text-align:center">${content}</h6> <img src="${image}" width="300" height="150">`);
      } else {
        popup = L.popup().setContent(`<h6 style ="text-align:center">${content}</h6>`);

      }
      //binds popup info to current marker
      marker.bindPopup(popup).openPopup();
    }
    //loads the title and map description information
    $("#titleDes").text(title);
    $("#mapDesDis").text(mapdes);
    // console.log(res);
  });



});
