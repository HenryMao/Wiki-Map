

$(document).ready(function(){

  let greenIcon = L.icon({
    iconUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F299087%2Fmap_marker_icon&psig=AOvVaw1UvUEg2RNJNc-p0-HuLXak&ust=1595734007594000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNDe3se65-oCFQAAAAAdAAAAABAD',
    shadowUrl: '',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
  }).addTo(mymap);
  L.marker([49.02, -122.7]).addTo(mymap);



    $('#toMap').click(() =>{
      $.ajax({
        method: "GET",
        url: "/map"
      }).done((res) => {

        console.log(res.result[0]);
        let mymap = L.map('map').setView([res.result[0].latitude, res.result[0].longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
      }).addTo(mymap);
          L.marker([res.result[0].latitude, res.result[0].longitude]).addTo(mymap);
      });;
    })



});

