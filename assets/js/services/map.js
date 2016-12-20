var map;
var chances = 0;
var win = false;
var point = {lat: 50.8201646, lng: 4.398042};
var latlng;
var options;
var fotosID


function getLatLng(address, callback){
  geocoder = new google.maps.Geocoder();

  var location = { address: address }

  geocoder.geocode(location, function(results, status) {
    if(status == "ZERO_RESULTS") {
      alert("No location found.")
    } else {
      var latlng = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }
      callback(latlng)
    }
  })

}



 function inRange(latc, lngc, lat, lng, km) {
  var range = km*1000
  var distance = getDistance({ lat: function() { return latc}, lng: function() { return lngc} }, { lat: function() { return lat}, lng: function() { return lng} });

  if(distance<range) { return true }
  return false
 }


function GuessingMap(){
    
      geocoder = new google.maps.Geocoder();
      //fotosID = fotoID
      
      if(arguments.length == 0){
        // provide some default initialization options
        options = 
        {
          zoom: 14,
          center: new google.maps.LatLng(50.8201646, 4.398042),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      }
      
      // map_canvas is the id of the HTML element we are using as the map canvas (see HTML snippet above)
      map = new google.maps.Map(document.getElementById("map"), options);

      var onError = function(error) {
        console.log("Could not get the current location.");
      };
      
      if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
          function(position) {
           var currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            // now that we have the current location, use the Map API to move the map to this location
            // you may also want to adjust the zoom level
            // see the API reference for the relevant functions:
            // https://developers.google.com/maps/documentation/javascript/reference
            
            map.panTo(currentLocation);
            
          }, 
          onError
       );
      }else{
        onError();
      }
      google.maps.event.addListener(map, "click", Testlocation);

      
}


function LocationMap(){
  geocoder = new google.maps.Geocoder();
  var setting = false;
  if(latitude == "NULL"){
    latitude = 50.8201646;
    longitude = 4.398042
    setting = true;
    console.log(latitude);
    console.log(longitude);
  }
  latlng = new google.maps.LatLng(latitude, longitude)

    if(arguments.length == 0){
      // provide some default initialization options
      options = 
      {
        zoom: 20,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }
  
  // map_canvas is the id of the HTML element we are using as the map canvas (see HTML snippet above)
  map = new google.maps.Map(document.getElementById("map"), options);
  google.maps.event.addListener(map, "click", getlocation);

      
}

function getlocation(event){
  if(chances > 0){
    console.log("no");
  }else{
    var marker = new google.maps.Marker(
    { 
      map: map,
      position: event.latLng,
      title: "NEW MARKER"
    });
  google.maps.event.addListener(marker, "click", function(event){openMarkerPopup(marker);});
  chances = chances+1;
  latlng = event.latLng;
  }  
  // HIER MOET DE JUISTE  FUNCTIE OPGEROEPEN WORDEN (om de geklikte functie op te slaan)

}

function Testlocation(event){
  latlng = event.latLng;
   if(chances < 3){
    // NIET VERGETEN OM DE LOCATIE NOG TE TESTEN 
      var marker = new google.maps.Marker(
    { 
      map: map,
      position: event.latLng,
      title: "NEW MARKER"
    });
  google.maps.event.addListener(marker, "click", function(event){openMarkerPopup(marker);});
       chances = chances + 1;
     }


}

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};