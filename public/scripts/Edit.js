$(document).ready(()=>{
  let counter = 30;
  let mymap = L.map('map').setView([49.260761, -123.115662], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
}).addTo(mymap);
  mymap.on('click',(coord)=>{
    counter++;
    console.log(coord.latlng);
    $.ajax({
      method: "POST",
      url: "/edit1",
      data: {id: counter, lat: coord.latlng.lat, lng: coord.latlng.lng}
    }).done((res) => {
      console.log("????");
      console.log(res);
      let marker = L.marker([res.pinned[0].latitude, res.pinned[0].longitude])
      marker.addTo(mymap);
      let content = `<p></p>
      <img src="https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80" alt="Girl in a jacket" width="50px" height="60px">`;
      let popup = L.popup().setContent(content);
      marker.bindPopup(popup).openPopup();
    }).catch((err) =>{
      console.log(err);
    });
  })




})

// let marker = L.marker([res.result[0].latitude, res.result[0].longitude])
//       marker.addTo(mymap);
//       var popup = L.popup().setContent("okay nice popup");
//       marker.bindPopup(popup).openPopup();
