var app = angular.module("app.papers");

app.factory("svPaper", ["$http", function ($http) {
    return{
        get: function(){
            return $http.get("/api/paper");
        },
        create: function(todoData){
            return $http.post("/", todoData);
        },
        update: function(todoData){
            return $http.put("/api/paper/:id", todoData);
        },
    }
}]);