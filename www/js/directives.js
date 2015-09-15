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
    center: { lat: 39.7392358, lng: -104.990251}, //Denver
    zoom: 14
  };

  var map = new google.maps.Map(elem[0], mapOptions);

  var lastValidCenter = map.getCenter();

  map.setCenter(lastValidCenter);

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
