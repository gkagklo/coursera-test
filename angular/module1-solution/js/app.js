(function () {
  'use strict';
  
  angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
      $scope.lunchItems = "";
      $scope.message = "";
      $scope.statusClass = "";
      $scope.checkLunchItems = function() {
          var itemsCount = getItemsCount($scope.lunchItems);
          if (itemsCount == 0) {
              $scope.message = "Please enter data first";
              $scope.statusClass = "error";
          } else if (itemsCount <= 3) {
              $scope.message = "Enjoy!";
              $scope.statusClass = "fine";
          } else {
              $scope.message = "Too much!";
              $scope.statusClass = "fine";
          }
      }
  }
  
  function getItemsCount(string) {
      return string.split(',')
          .filter(function(item) { return item.trim().length != 0 })
          .length;
  }
  })();