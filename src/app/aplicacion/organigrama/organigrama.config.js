(function () {
    'use strict';

    angular
        .module('app.aplicacion.organigrama')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('template.organigrama', {
                url: '/organizacion',
                views: {
                    'contenido': {
                        templateUrl: 'app/aplicacion/organigrama/organigrama.tmpl.html',
                        controller: 'OrganigramaController',
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
