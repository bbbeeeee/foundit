var map;

function initialize() {
    var mapOptions = {
        zoom: 6
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
            $('#lat').val(position.coords.latitude);
            $('#long').val(position.coords.longitude);

            console.log($('#lat').val())
            console.log($('#long').val())
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'The item was found here.'
            });

            map.setCenter(pos);
            //new code, next two lines
            var lat = position.coords.latitude;
            alert(lat);
            var long = position.coords.longitude;
            alert(long);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);