$(document).ready(()=>{
  let counter;
  let coordObj = {};
  let map_id;
  let mymap = L.map('map').setView([49.260761, -123.115662], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
}).addTo(mymap);
  let marker;
  let content;
  let popup;
    mymap.on('click',(coord)=>{
      counter++;
      coordObj[counter] = {id: counter, lat: coord.latlng.lat, lng: coord.latlng.lng}

        marker = L.marker([coord.latlng.lat, coord.latlng.lng], {draggable: true})
        marker.addTo(mymap);
        content = `
        <input class="form-control" id="pinNote" type="text" placeholder="pin Title">
        <button>click</button>`;
        popup = L.popup().setContent(content);
        marker.bindPopup(popup).openPopup();

        marker.on("move",(data)=>{
          //console.log(data);
          content = data;
          for(let i in coordObj){
            if(coordObj[i].lat === data.oldLatLng.lat && coordObj[i].lng === data.oldLatLng.lng){
              coordObj[i].lat = data.latlng.lat;
              coordObj[i].lng = data.latlng.lng;
            }
          }
          // console.log(coordObj);
          $("#coordDisplay").text(`lattitde: ${content.latlng.lat}, longitude: ${content.latlng.lng}`);

        })
        marker.on('dblclick',() =>{
          marker.remove();
          delete coordObj[counter];
          console.log(coordObj);
        })

      // })
    })

    $.ajax({
      method:"GET",
      url: "/load",
    }).done(res => {
      //console.log(res);
      if(!res[0]){
        map_id = 0;
        counter = 0;
        //console.log(map_id);
      } else{
        //console.log(map_id);
        map_id = res[0].mapid;
        counter = res[0].id;
        for(pin in res){
          map_id = Math.max(res[pin].mapid, map_id);
          counter = Math.max(res[pin].id, counter);
        }
      }
      $('#createButton').click(() => {
        map_id++;
        // console.log("fire");
        // console.log($("#nameDisplay").text());
        for(let pin in coordObj){
          $.ajax({
            method:"POST",
            url:"/edit/retrieve",
            data: {username: $("#nameDisplay").text(), id: coordObj[pin].id, map_id: map_id, lat: coordObj[pin].lat, lng: coordObj[pin].lng},
            async: false
          })
        }
        coordObj = {};
        mymap.remove();
      });
    })

    $('#newMap').click(() => {
    mymap = L.map('map').setView([49.260761, -123.115662], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaGVucnltYW8iLCJhIjoiY2tkMHh6enBjMHJ4NTJ4bG9nYWtweDcwdiJ9.nfHhyyhan06wSZYoqdayhA'
}).addTo(mymap);
    window.location.replace("/edit");
    })

    $("#backToProfile").click(() =>{
      window.location.replace("/profile");
    })




})

// let marker = L.marker([res.result[0].latitude, res.result[0].longitude])
//       marker.addTo(mymap);
//       var popup = L.popup().setContent("okay nice popup");
//       marker.bindPopup(popup).openPopup();
