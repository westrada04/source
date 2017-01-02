(function () {
    'use strict';

    angular
        .module('app.aplicacion.misSocilitudes')
        .factory('SolicitudesService', SolicitudesService);

    function SolicitudesService($q, $http, API_BACKEND) {
        var service = {
            getSolicitudes: getSolicitudes
        };

        return service;

        /////////////////
        function getSolicitudes() {
            var defered = $q.defer();
            var promise = defered.promise;

            $http.get(API_BACKEND.url + '/rolintegrante')
                .then(function (response) {
                    defered.resolve(response);
                }, function (error) {
                    defered.reject(error);
                });

            return promise;
        }
    }

})();
