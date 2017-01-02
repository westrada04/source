(function () {
    'use strict';

    angular
        .module('app.aplicacion.login')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('template.login', {
                url: '/iniciar-session',
                views: {
                    'contenido': {
                        templateUrl: 'app/aplicacion/login/login.tmpl.html',
                        // set the controller to load for this page
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                },
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            });
    }
})();
