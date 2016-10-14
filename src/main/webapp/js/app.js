var myApp = angular.module('DemoApp', ['ngRoute']);
var newcar = {};
myApp.config(function ($routeProvider) {
    $routeProvider
            .when("/addCar", {
                templateUrl: "view/form.html",
                controller: "CarController"
            })
            .otherwise({
                redirectTo: "/"
            });
});

myApp.factory('CarFactory', function () {
    var cars = [];

    var nextId = 5;



    function getRestCars() {
        cars = [];
        $.getJSON("http://localhost:8080/Problem3/api/car/all", function (result)
        {
            $.each(result, function (i, car)
            {
                cars.push({id: car.id, year: car.modelYear, registered: car.registered, make: car.make, model: car.model, description: car.description, price: car.price});
            });
        });
    }

    function addRestCar(car) {
        var carJSON = '{"id": ' + car.id + ',"description": "' + car.description + '","make": "' + car.make + '","model": "' + car.model + '","modelYear": ' + car.year + ',"price": ' + car.price + ',"registered": "' + car.registered + '"}';
        $.ajax({
            url: "http://localhost:8080/Problem3/api/car",
            type: "POST",
            data: carJSON,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {}
        });
    }
    
    function deleteRestCar(id) {
        $.ajax({
            url: "http://localhost:8080/Problem3/api/car/"+id,
            type: "DELETE",
            data: "",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {}
        });
    }
    
    function editRestCar(car) {
        var carJSON = '{"id": ' + car.id + ',"description": "' + car.description + '","make": "' + car.make + '","model": "' + car.model + '","modelYear": ' + car.year + ',"price": ' + car.price + ',"registered": "' + new Date(car.registered).toJSON() + '"}';
        $.ajax({
            url: "http://localhost:8080/Problem3/api/car",
            type: "PUT",
            data: carJSON,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {}
        });
    }

    var getCars = function () {
        getRestCars();
        return cars;
    };

    var deleteCar = function (id) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === id) {
                cars.splice(i, 1);
                deleteRestCar(id);
                return;
            }
        }
    };

    var addEditCar = function (newcar) {
        if (newcar.id === null) {
            newcar.id = nextId++;
            cars.push(newcar);
        } else {
            for (var i = 0; i < cars.length; i++) {
                if (cars[i].id === newcar.id) {
                    cars[i] = newcar;
                    break;
                }
            }
        }
    };

    var addCar = function (newcar) {
        newcar.id = nextId++;
        addRestCar(newcar);
        cars.push(newcar);
    };

    var editCar = function (newcar) {
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].id === newcar.id) {
                cars[i] = newcar;
                break;
            }
        }
        editRestCar(newcar);
    };

    return {
        getCars: getCars,
        deleteCar: deleteCar,
        addEditCar: addEditCar,
        addCar: addCar,
        editCar: editCar
    };



});


myApp.controller('CarController', ["$scope", "CarFactory", function ($scope, CarFactory) {
        var self = this;

        //self.newcar = newcar;
        self.cars = CarFactory.getCars();
        self.title = "Cars Demo App";
        self.predicate = "year";
        self.reverse = false;
        self.nextId = 5;
        self.showForm = false;
        self.edit = false;

        self.setShowForm = function (set) {
            this.showForm = set;
        };

        self.deleteCar = function (car) {
            CarFactory.deleteCar(car.id);
        };
        self.addEditCar = function () {
            if (self.edit) {
                CarFactory.editCar(self.newcar);
            } else {
                cartmp = {id: null, year: self.newcar.year, registered: new Date(self.newcar.registered).toJSON(), make: self.newcar.make, model: self.newcar.model, description: self.newcar.description, price: self.newcar.price};
                CarFactory.addCar(cartmp);
            }
        };

        self.addCar = function (car) {
            CarFactory.addCar(car);
        };

        self.editCar = function (car) {
            CarFactory.editCar(car);
        };

        self.resetCar = function () {
            self.newcar = {};
        };

        self.setCarFormData = function (car) {
            car.registered = new Date(car.registered);
            self.newcar = car;
        };

        self.setEdit = function (value) {
            self.edit = value;
        };

    }]);

