'use strict';

app.controller('TeamCtrl', function($scope) {
  $scope.goalkeeper = [
  { 'id': 'P01', 'title': 'GK1', 'drag': true }
  ];
  $scope.defense = [
  { 'id': 'P02', 'title': 'DF1', 'drag': true },
  { 'id': 'P03', 'title': 'DF2', 'drag': true },
  { 'id': 'P04', 'title': 'DF3', 'drag': true },
  { 'id': 'P05', 'title': 'DF4', 'drag': true }
  ];
  $scope.midfield = [
  { 'id': 'P06', 'title': 'MF1', 'drag': true },
  { 'id': 'P07', 'title': 'MF2', 'drag': true },
  { 'id': 'P08', 'title': 'MF3', 'drag': true },
  { 'id': 'P09', 'title': 'MF4', 'drag': true }
  ];
  $scope.forward = [
  { 'id': 'P10', 'title': 'FW1', 'drag': true },
  { 'id': 'P11', 'title': 'FW2', 'drag': true }
  ];

  $scope.bench = [
  { 'id': 'P12', 'title': 'GK2', 'drag': true },
  { 'id': 'P13', 'title': 'DF5', 'drag': true },
  { 'id': 'P14', 'title': 'DF6', 'drag': true },
  { 'id': 'P15', 'title': 'MF5', 'drag': true },
  { 'id': 'P16', 'title': 'FW3', 'drag': true },
  { 'id': 'P17', 'title': 'FW4', 'drag': true },
  { 'id': 'P18', 'title': 'FW5', 'drag': true }
  ];

  $scope.playersOnField = function(){
    return $scope.goalkeeper.length + $scope.defense.length + $scope.midfield.length + $scope.forward.length;
    
  }

  // Goalkeeper
  $scope.gk_rest = {
    accept: function() {
      console.log($scope.playersOnField());
      if ($scope.goalkeeper.length >= 1) {
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
        if ($scope.defense.length >= 5) {
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
        if ($scope.midfield.length >= 5) {
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
        if ($scope.forward.length >= 5) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
});
