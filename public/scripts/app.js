

$(document).ready(function(){

      $.ajax({
        method: "GET",
        url: "/test"
      }).done((res) => {

        let mymap = L.map('map').setView([res.result[0].latitude, res.result[0].longitude], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
      }).addTo(mymap);
          let marker = L.marker([res.result[0].latitude, res.result[0].longitude])
          marker.addTo(mymap);
          var popup = L.popup().setContent("okay nice popup");
          marker.bindPopup(popup).openPopup();
      });;



});

