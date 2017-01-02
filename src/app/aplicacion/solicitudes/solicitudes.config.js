(function () {
    'use strict';

    angular
        .module('app.aplicacion.solicitudes')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.nuevaSolicitud', {
                url: '/nueva-Solicitud',
                templateUrl: 'app/aplicacion/solicitudes/nuevaSolicitud/nuevaSolicitud.tmpl.html',
                controller: 'NuevaSolicitudController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                }
            })
            .state('triangular.solicitudes', {
                url: '/solicitudes',
                templateUrl: 'app/aplicacion/solicitudes/misSolicitudes/mis-solicitudes.tmpl.html',
                controller: 'MisSolicitudesController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    SolicitudesResponse: function (SolicitudesService) {
                        return SolicitudesService.getSolicitudes()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Solicitudes',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [
                {
                    name: 'Realizar Solicitud',
                    state: 'triangular.nuevaSolicitud',
                    type: 'link'
                },
                {
                    name: 'Mis Solicitudes',
                    state: 'triangular.solicitudes',
                    type: 'link'
                },
                {
                    name: 'Solicitudes Pendientes',
              //      state: 'triangular.solicitudes',
                    type: 'link'
                },
                {
                    name: 'Solicitudes Resueltas',
                //    state: 'triangular.solicitudes',
                    type: 'link'
                }
            ]
        });
    }
})();
