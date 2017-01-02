(function () {
    'use strict';

    angular
        .module('app.aplicacion.nosotros')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('template.nosotros', {
                url: '/nosotros',
                views: {
                    'contenido': {
                        templateUrl: 'app/aplicacion/nosotros/nosotros.tmpl.html',
                        // set the controller to load for this page
                        controller: 'NosotrosController',
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
