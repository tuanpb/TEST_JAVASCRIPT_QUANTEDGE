var app = angular.module("app.papers", []);

app.controller("paperController", ['$scope', 'svPaper', function ($scope, svPaper) {
    $scope.appName = "Paper Dashboard";
    $scope.loading = true;

    $scope.fromData = {};

    $scope.papers = [];

    $scope.getall = function () {
        svPaper.get().then(function (res) {
            $scope.papers = res.data;
            // console.log($scope.papers);
            for (i = 0; i < $scope.papers.length; i++) {
                $scope.papers[i].Value = parseFloat($scope.papers[i].Price * $scope.papers[i].Volume).toFixed(0);
                $scope.papers[i].Change1 = parseFloat($scope.papers[i].Price - $scope.papers[i].OldPrice).toFixed(2);
                $scope.papers[i].Change2 = parseFloat(($scope.papers[i].Price - $scope.papers[i].OldPrice) / $scope.papers[i].OldPrice * 100).toFixed(2);
            }
        })
    }

    $scope.getall();
    setInterval(function(){$scope.getall()},1000);

}]);

