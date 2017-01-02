(function () {
    'use strict';

    angular
        .module('app.aplicacion.integrantes')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.integrantes', {
                url: '/integrantes-consejo',
                templateUrl: 'app/aplicacion/integrantes/integrantes.tmpl.html',
                // set the controller to load for this page
                controller: 'IntegrantesController',
                controllerAs: 'vm',
                // layout-column class added to make footer move to
                // bottom of the page on short pages
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    IntegrantesResponse: function (IntegrantesService) {
                        return IntegrantesService.getIntegrantes()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Integrantes de Consejo',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Integrantes',
                state: 'triangular.integrantes',
                type: 'link'
            }]
        });
    }
})();
