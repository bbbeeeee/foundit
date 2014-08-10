var map;

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(42.35, -71.055)
  };
  map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);