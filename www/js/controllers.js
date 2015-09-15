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

          $scope.latitude = position.coords.latitude;
          $scope.longitude = position.coords.longitude;

          var altFt = position.coords.altitude * 3.2808;
          $scope.altitude = altFt.toFixed(0);

        }, function(err) {
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

        console.log('Location watch error: ' + JSON.stringify(err));
      }

      function locWatchSuccess(position) {
        $scope.position = position;

        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;

        var altFt = position.coords.altitude * 3.2808;
        $scope.altitude = altFt.toFixed(0);

      }

    });
  });

