$(document).ready(()=>{
  //declaring variables for later use
  let counter; //counter keeps track of the pin id
  let coordObj = {}; // coordobj keeps track of info for every pin
  let map_id; //variable used to find initial map id
  //sets up initial map view upon document ready
  let mymap = L.map('map').setView([49.260761, -123.115662], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
  }).addTo(mymap);
  //variables declared for marker addition
  let marker;
  let content;
  let image;
  let popup;
  //event for when anywhere on the map is clicked
  mymap.on('click',(coord)=>{
    //a pin is placed and counter increments to increment pin id
    counter++;
    //record marker description and image url and location of pin
    content = $("#pinNote").val();
    image = $("#imgurl").val();
    coordObj[counter] = {id: counter, pinNote: content, img: image, lat: coord.latlng.lat, lng: coord.latlng.lng};
    //initial display of marker location upon placement
    $("#coordDisplay").text(`lattitude: ${coord.latlng.lat}, longitude: ${coord.latlng.lng}`);
    //initializing marker to appear on the map
    marker = L.marker([coord.latlng.lat, coord.latlng.lng], {draggable: true});
    marker.addTo(mymap);

    //clear input fields to get ready for next pin placing
    $("#pinNote").val("");
    $("#imgurl").val("");
    //sets default marker description to be ! when no description is entered
    if (!content) {
      content = "!";
    }
    //prevents the image to be loaded with a broken frame when no url is entered
    if (image) {
      popup = L.popup().setContent(`<h5 style= "text-align:center">${content}</h5> <img src="${image}" width="300" height="150">`);
    } else {
      popup = L.popup().setContent(`<h5 style= "text-align:center">${content}</h5>`);
    }
    //binds popup to the marker
    marker.bindPopup(popup).openPopup();
    //event for when the marker is dragged across the map, triggers every instant
    marker.on("move",(data)=>{

      //looks for the old location in all markers and when found re-assign the marker with new location
      //updates realtime
      for (let i in coordObj) {
        if (coordObj[i].lat === data.oldLatLng.lat && coordObj[i].lng === data.oldLatLng.lng) {
          coordObj[i].lat = data.latlng.lat;
          coordObj[i].lng = data.latlng.lng;
        }
      }
      //updates the location of the moving pin realtime on display
      $("#coordDisplay").text(`lattitude: ${data.latlng.lat}, longitude: ${data.latlng.lng}`);

    });
    //event for when the most recent marker is doubleclicked
    marker.on('dblclick',() =>{
      //removes the most recent marker
      marker.remove();
      //delete its information from the coordobj
      delete coordObj[counter];
      //clear the location display
      $("#coordDisplay").text("");
    });
  });
  //ajax request when the screen loads
  $.ajax({
    method:"GET",
    url: "/load",
  }).done(res => {
    //gets the entire table of pins to determine initial pin id and map id
    if (!res[0]) {
      map_id = 0;
      counter = 0;
    } else {
      map_id = res[0].mapid;
      counter = res[0].id;
      //finds the largest pin and map id
      for (pin in res) {
        map_id = Math.max(res[pin].mapid, map_id);
        counter = Math.max(res[pin].id, counter);
      }
    }
    //event for when the create button is clicked
    $('#createButton').click(() => {
      map_id++;
      //records the map description entered in the appropriate input field
      let mapDescription = $("#mapDescription").val();
      //records the map title entered in the appropriate input field
      let mapTitle = $("#mapTitle").val();
      //send all pin information with ajax post in a for loop
      for (let pin in coordObj) {
        $.ajax({
          method:"POST",
          url:"/edit/retrieve",
          data: {username: $("#nameDisplay").text(), mapDes: mapDescription, mapTitle: mapTitle, pinNote: coordObj[pin].pinNote, img: coordObj[pin].img, id: coordObj[pin].id, map_id: map_id, lat: coordObj[pin].lat, lng: coordObj[pin].lng}
        });
      }
      //empty the container that stores all pins information
      coordObj = {};
      //remove the current map
      mymap.remove();
      alert("New map added! You can see it on your profile or the home page. Click New map button if you want to create another!")
      //clearn all input text fields
      $("#mapTitle").val("");
      $("#mapDescription").val("");
    });
  });
  //event for when new map button is clicked
  $('#newMap').click(() => {
    //a new map is created in place of the old map
    mymap = L.map('map').setView([49.260761, -123.115662], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
    }).addTo(mymap);
    //refresh the page to load the map
    window.location.replace("/edit");
  });
  //the back button to take the user back to the profile page
  $("#backToProfile").click(() =>{
    window.location.replace("/profile");
  });
});
