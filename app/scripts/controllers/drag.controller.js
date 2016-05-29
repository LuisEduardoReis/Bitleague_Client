'use strict';

 app.controller('DragCtrl', function($scope) {
  $scope.list1 = [];
  $scope.list2 = [];
  $scope.list3 = [];
  $scope.list4 = [];

  $scope.list5 = [
  { 'title': 'Item 1', 'drag': true },
  { 'title': 'Item 2', 'drag': true },
  { 'title': 'Item 3', 'drag': true },
  { 'title': 'Item 4', 'drag': true },
  { 'title': 'Item 5', 'drag': true },
  { 'title': 'Item 6', 'drag': true },
  { 'title': 'Item 7', 'drag': true },
  { 'title': 'Item 8', 'drag': true },
  { 'title': 'Item 9', 'drag': true },
  { 'title': 'Item 10', 'drag': true },
  { 'title': 'Item 11', 'drag': true },
  { 'title': 'Item S1', 'drag': true },
  { 'title': 'Item S2', 'drag': true },
  { 'title': 'Item S3', 'drag': true },
  { 'title': 'Item S4', 'drag': true },
  { 'title': 'Item S5', 'drag': true },
  { 'title': 'Item S6', 'drag': true },
  { 'title': 'Item S7', 'drag': true }
  ];

  $scope.playersOnField = function(){
    return $scope.list1.length + $scope.list2.length + $scope.list3.length + $scope.list4.length;
    
  }

        // Goalkeeper
        $scope.gk_rest = {
          accept: function() {
            console.log($scope.playersOnField());
            if ($scope.list1.length >= 1) {
              return false;
            } else {
              return true;
            }
          }
        };

        // Defense
        $scope.df_rest = {
          accept: function() {
            if($scope.playersOnField() < 11){
              if ($scope.list2.length >= 5) {
                return false;
              } else {
                return true;
              }
            }
          }
        };

        // Midfield
        $scope.mf_rest = {
          accept: function() {
            if($scope.playersOnField() < 11){
              if ($scope.list3.length >= 5) {
                return false;
              } else {
                return true;
              }
            }
          }
        };

        // Forward
        $scope.fw_rest = {
          accept: function() {
            if($scope.playersOnField() < 11){
              if ($scope.list4.length >= 5) {
                return false;
              } else {
                return true;
              }
            }
          }
        };
  });
