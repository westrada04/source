(function () {
    'use strict';

    angular
        .module('app.aplicacion.usuarios')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.usuarios', {
                url: '/usuarios',
                templateUrl: 'app/aplicacion/usuarios/usuarios.tmpl.html',
                // set the controller to load for this page
                controller: 'UsuariosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    auth: function (UserService) {
                        return UserService.authenticatedUser();
                    },
                    UsersResponse: function (UsersService) {
                        return UsersService.getAllUsuarios()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            })
            .state('triangular.administradores', {
                url: '/usuarios/administradores',
                templateUrl: 'app/aplicacion/usuarios/administradores/administradores.tmpl.html',
                // set the controller to load for this page
                controller: 'AdministradoresController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    auth: function (UserService) {
                        return UserService.authenticatedUser();
                    },
                    UsersResponse: function (UsersService) {
                        return UsersService.getAdministradores()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            })
            .state('triangular.docentes', {
                url: '/usuarios/docentes',
                templateUrl: 'app/aplicacion/usuarios/docentes/docentes.tmpl.html',
                // set the controller to load for this page
                controller: 'DocentesController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    auth: function (UserService) {
                        return UserService.authenticatedUser();
                    },
                    UsersResponse: function (UsersService) {
                        return UsersService.getDocentes()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            })
            .state('triangular.estudiantes', {
                url: '/usuarios/estudiantes',
                templateUrl: 'app/aplicacion/usuarios/estudiantes/estudiantes.tmpl.html',
                // set the controller to load for this page
                controller: 'EstudiantesController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        contentClass: 'layout-column'
                    }
                },
                resolve: {
                    auth: function (UserService) {
                        return UserService.authenticatedUser();
                    },
                    UsersResponse: function (UsersService) {
                        return UsersService.getEstudiantes()
                            .then(function (response) {
                                return response;
                            });
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'usuarios',
            icon: 'fa fa-tree',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'Administradores',
                state: 'triangular.administradores',
                type: 'link'
            }, {
                name: 'Docentes',
                state: 'triangular.docentes',
                type: 'link'
            }, {
                name: 'Estudiantes',
                state: 'triangular.estudiantes',
                type: 'link'
            }, {
                name: 'Todos los Usuarios',
                state: 'triangular.usuarios',
                type: 'link'
            }]
        });
    }
})();
