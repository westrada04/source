(function () {
    'use strict';

    angular
        .module('app.aplicacion.usuarios')
        .factory('UsersService', UsersService);

    function UsersService($q, $http, API_BACKEND) {

        var service = {
            getAllUsuarios: getAllUsuarios,
            getAdministradores: getAdministradores,
            getDocentes: getDocentes,
            getEstudiantes: getEstudiantes
        };

        return service;

        /////////////////

        function getAllUsuarios() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BACKEND.url + '/user')
                .then(function (response) {
                    defered.resolve(response);
                }, function (response) {
                    defered.reject(response);
                });

            return promise;
        }

        function getAdministradores() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BACKEND.url + '/administrador')
                .then(function (response) {
                    defered.resolve(response);
                }, function (response) {
                    defered.reject(response);
                });

            return promise;
        }

        function getDocentes() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BACKEND.url + '/docente')
                .then(function (response) {
                    defered.resolve(response);
                }, function (response) {
                    defered.reject(response);
                });

            return promise;
        }

        function getEstudiantes() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BACKEND.url + '/estudiante')
                .then(function (response) {
                    defered.resolve(response);
                }, function (response) {
                    defered.reject(response);
                });
            return promise;
        }

    }


})();
