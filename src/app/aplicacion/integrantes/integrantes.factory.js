(function () {
    'use strict';

    angular
        .module('app.aplicacion.integrantes')
        .factory('IntegrantesService', IntegrantesService);

    function IntegrantesService($q, $http, API_BACKEND) {
        var service = {
            getIntegrantes: getIntegrantes
        };

        return service;

        /////////////////
        function getIntegrantes() {
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
