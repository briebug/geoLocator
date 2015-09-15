angular
  .module('geoLocator')
  .directive('mapInstance', MapInstance);

function MapInstance() {
  return {
    restrict: 'A',
    link: MapInstanceLink,
    scope: {
      position: '=',
      lock: '='
    }
  }
}

function MapInstanceLink(scope, elem, attrs) {
  'use strict';

  /*
   *  Map init
   */

  var mapOptions = {
    center: { lat: 39.6595163, lng: -104.9822292}, //Denver
    zoom: 14
  };

  var map = new google.maps.Map(elem[0], mapOptions);

  /*
   *  Map bounds listeners / limiters.
   */

  // bounds of the desired area
  //var allowedBounds = new google.maps.LatLngBounds(
  //  new google.maps.LatLng(39.533623, -105.245112),
  //  new google.maps.LatLng(39.771739, -104.827578)
  //);
  var lastValidCenter = map.getCenter();

  //google.maps.event.addListener(map, 'center_changed', function() {
  //  if (allowedBounds.contains(map.getCenter())) {
  //    // still within valid bounds, so save the last valid position
  //    lastValidCenter = map.getCenter();
  //    return;
  //  }

    // not valid anymore => return to last valid position
    map.setCenter(lastValidCenter);
  //});

  /*
   *  User GPS position and map set
   */

  scope.$watch('position', updatePosition);

  var marker;
  function updatePosition(newPosition) {
    if(newPosition) {
      var googlePosition = new google.maps.LatLng(
        newPosition.coords.latitude,
        newPosition.coords.longitude
      );

      if (marker) {
        marker.setPosition(googlePosition);

        if (scope.lock) {
          map.panTo(googlePosition);
        }

      } else {
        marker = new google.maps.Marker({
          position: googlePosition,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: '#00CC00',
            strokeColor: '#00CC00'
          },
          map: map
        });

        if (scope.lock) {
          map.setZoom(14);
          map.panTo(googlePosition)
        }
      }
    }
  }
}
