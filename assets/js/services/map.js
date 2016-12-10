var map;
var latlng;
var counter 3
    function initMap() {
        var point = {lat: 50.8201646, lng: 4.398042};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: point
    });
        google.maps.event.addListener(map, 'click', function(event) {
          latlng = event.latLng;
          console.log(latlng);
          console.log(fotoID);
          if (getDistance(fotoID, latlng) < 100){
            document.write("Yes, you guessed right!");
          }else{
            if(counter = 0){
              location.reload();
              document.write("Oops, you guessed wrong 3 times");

            }
          }

          //latlng naar het foto object(met ID = fotoID) sturen
          // als teller = 3 quiz gedaan, pagina reload  
      });
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
