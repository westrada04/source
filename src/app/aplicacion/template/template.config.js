(function () {
    'use strict';

    angular
        .module('app.aplicacion.template')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('template', {
                abstract: true,
                views: {
                    'root': {
                        templateUrl: 'app/aplicacion/template/template.tmpl.html',
                        controller: 'TemplateController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            });
        triMenuProvider.addMenu({
            name: 'Aplicacion',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 10.1,
            children: [{
                name: 'Login',
                state: 'template.login',
                type: 'link'
            }, {
                name: 'Nosotros',
                state: 'template.nosotros',
                type: 'link'
            }, {
                name: 'Organizacion',
                state: 'template.organigrama',
                type: 'link'
            }]
        });
    }
})();
