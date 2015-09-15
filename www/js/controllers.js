angular.module('geoLocator')
  .controller('MainController', function($scope, $ionicPlatform, $cordovaGeolocation) {
    $scope.position = null;
    $scope.lock = true;

    $ionicPlatform.ready(function() {
      var positionOptions = {
        timeout: 10000,
        enableHighAccuracy: true
      };

      $cordovaGeolocation.getCurrentPosition(positionOptions)
        .then(function (position) {
          $scope.position = position;

          $scope.latitude = position.coords.latitude.toFixed(3);
          $scope.longitude = position.coords.longitude.toFixed(3);

          var altFt = position.coords.altitude * 3.2808;
          $scope.altitude = altFt.toFixed(0);

          alert('got location');
        }, function(err) {
          alert('did not get location');
          console.log('Location error: ' + JSON.stringify(err));
        });

      var watchOptions = {
        frequency: 1000,
        timeout: 10000,
        enableHighAccuracy: false
      };

      var locationWatcher = $cordovaGeolocation.watchPosition(watchOptions);

      locationWatcher.then(null, locWatchErr, locWatchSuccess);

      function locWatchErr(err) {
        alert('watch did not get location');

        console.log('Location watch error: ' + JSON.stringify(err));
      }

      function locWatchSuccess(position) {
        $scope.position = position;

        $scope.lat = position.coords.latitude.toFixed(3);
        $scope.long = position.coords.longitude.toFixed(3);

        var altFt = position.coords.altitude * 3.2808;
        $scope.alt = altFt.toFixed(0);
        alert(' watch got location');

      }

    });
  });

