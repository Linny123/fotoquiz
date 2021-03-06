var map;
var newQuizMarker;

// Transforms an address/location (in text form) to latlng 
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
};

// Boolean function that returns if a given latlng is whitin range of another
function inRange(latc, lngc, lat, lng, km) {
  var range = km*1000
  var distance = getDistance({ lat: function() { return latc}, lng: function() { return lngc} }, { lat: function() { return lat}, lng: function() { return lng} });

  if(distance<range) { return true }
  return false
};

var rad = function(x) {
  return x * Math.PI / 180;
};

// Calculates two the distance between two latlng's
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


// Loads the map and centers + places marker on the given latlng
function loadMap(lat, lng) {
  if(lat == null) {
    var location = new google.maps.LatLng(50.8201646, 4.398042) // If no exif data, set map to VUB
  } else {
    var location = new google.maps.LatLng(lat, lng)
  }

  var options = {
      zoom: 13,
      center: location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  map = new google.maps.Map(document.getElementById("map"), options);

  newQuizMarker = new google.maps.Marker({ 
    map: map,
    position: location,
    title: "Drag marker to the correct position",
    draggable:true
  });
}




function GuessingMap(){
  // Create map
  var options = {
    zoom: 10,
    center: new google.maps.LatLng(50.8201646, 4.398042), // Center on VUB
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map"), options);

  // Ask for HTML5 user location (does not work on Safari 10 if HTTP)
  var onError = function(error) {
    console.log("Could not get the current location of user. Error: "+error);
  };

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      
        map.panTo(pos);

      }, onError);

  } else {
    onError();
  }

  addMarker(); 
}


function addMarker() {
  newQuizMarker = new google.maps.Marker({ 
    map: map,
    position: map.getCenter(),
    title: "Drag marker to the correct position",
    draggable:true
  });
}


function getMarkerLocation() {
  return newQuizMarker.getPosition()
}

