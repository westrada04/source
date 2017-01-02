(function() {
    'use strict';

    angular
        .module('app.aplicacion.actas')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.nueva-acta', {
            url: '/actas',
            templateUrl: 'app/aplicacion/actas/nueva-acta/nueva-acta.tmpl.html',
            // set the controller to load for this page
            controller: 'NuevaActaController',
            controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Actas',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Actas',
                state: 'triangular.nueva-acta',
                type: 'link'
            }]
        });
    }
})();
