(function () {
    'use strict';

    angular
        .module('app.aplicacion.integrantes')
        .controller('IntegrantesController', IntegrantesController);

    /* @ngInject */
    function IntegrantesController(IntegrantesResponse, IntegrantesService, $mdDialog, $http, API_BACKEND, $mdToast) {
        var vm = this;

        vm.integrantes = IntegrantesResponse.data;
        vm.size = vm.integrantes.length;

        vm.query = {
            filter: '',
            limit: 10,
            order: 'id',
            page: 1
        };

        vm.selected = [];
        vm.limitOptions = [5, 10, 15];

        vm.label = {
            page: 'Página:',
            rowsPerPage: 'Filas por página:',
            of: 'de'
        };

        vm.columnas = {
            id: '#',
            rol: 'Cargo',
            nombres: 'Nombres',
            apellidos: 'Apellidos',
            email: 'Email',
            telefono: 'Telefono'
        };

        vm.filter = {
            options: {
                debounce: 500
            }
        };

        vm.removeFilter = function () {
            vm.filter.show = false;
            vm.query.filter = '';

            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        };

        vm.load = function () {
            vm.promise = IntegrantesService.getIntegrantes();
            vm.promise.then(function (response) {
                vm.integrantes = response.data;
                $mdToast.show({
                    template: '<md-toast><span flex>Registros Actualizados</span></md-toast>',
                    position: 'top right',
                    hideDelay: 5000
                });
            });
        };

        vm.remove = function (ev) {
            if (vm.selected.length == 1) {
                var confirmar = $mdDialog.confirm()
                    .title('Seguro de eliminar este cargo?')
                    .textContent('')
                    .targetEvent(ev)
                    .cancel('Cancelar')
                    .clickOutsideToClose(true)
                    .ok('Eliminar');
                $mdDialog.show(confirmar).then(function () {
                    eliminarIntegrante();
                });
            } else {
                var confirmar = $mdDialog.confirm()
                    .title('Seguro de eliminar estos cargos?')
                    .textContent('')
                    .targetEvent(ev)
                    .cancel('Cancelar')
                    .clickOutsideToClose(true)
                    .ok('Eliminar');
                $mdDialog.show(confirmar).then(function () {
                    eliminarIntegrantes();
                });
            }
        };

        function eliminarIntegrantes() {
            var roles = [];
            vm.selected.forEach(function (item) {
                roles.push(item.id);
            });
            var objeto = {
                'roles': roles
            };

            $http.post(API_BACKEND.url + '/destroyrolintegrantes', objeto)
                .then(function () {
                    for (var x = 0; x < roles.length; x++) {
                        for (var y = vm.integrantes.length - 1; y >= 0; y--) {
                            if (vm.integrantes[y].id == roles[x]) {
                                vm.integrantes.splice(y, 1);
                            }
                        }
                    }
                    vm.size = vm.integrantes.length;
                    vm.selected.length = 0;

                    $mdToast.show({
                        template: '<md-toast><span flex>Usuarios Eliminados Exitosamente</span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });
                }, function (error) {
                    var errores = '';
                    angular.forEach(error.data, function (value) {
                        errores = value;
                    });
                    $mdToast.show({
                        template: '<md-toast><span flex> Eliminacion fallida: ' + errores + ' </span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });
                });
        }

        function eliminarIntegrante() {
            $http.delete(API_BACKEND.url + '/rolintegrante/' + vm.selected[0].id)
                .then(function () {
                    $mdToast.show({
                        template: '<md-toast><span flex>Usuario Eliminado Exitosamente</span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });
                    var index = vm.integrantes.findIndex(buscar);
                    vm.integrantes.splice(index, 1);
                    vm.size = vm.integrantes.length;
                    vm.selected.length = 0;
                });
        }

        function buscar(element) {
            return element === vm.selected[0];
        }

        vm.crearUsuario = function (ev) {
            $mdDialog.show({
                controller: CreateController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/integrantes/integrantes.create.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (response) {

                $http.post(API_BACKEND.url + '/rolintegrante', response)
                    .then(function (request) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Registro Exitoso</span></md-toast>',
                            position: 'top right',
                            hideDelay: 5000
                        });
                        vm.size = vm.integrantes.push(request.data);
                    }, function (error) {
                        var errores = '';
                        angular.forEach(error.data, function (value) {
                            errores += value;
                        });
                        $mdToast.show({
                            template: '<md-toast><span flex> Registro Fallido ' + errores + ' </span></md-toast>',
                            position: 'top right',
                            hideDelay: 5000
                        });
                    });
            });
        };

        vm.editarUsuario = function (ev) {
            $mdDialog.show({
                controller: EditController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/integrantes/integrantes.edit.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    integrante: angular.copy(vm.selected[0])
                }
            }).then(function (response) {

                $http.put(API_BACKEND.url + '/rolintegrante/' + response.id, response)
                    .then(function () {
                        $mdToast.show({
                            template: '<md-toast><span flex>Editado Exitosamente</span></md-toast>',
                            position: 'top right',
                            hideDelay: 5000
                        });

                        angular.extend(vm.selected[0], response);
                        vm.selected.length = 0;

                    }, function (error) {
                        var errores = '';
                        angular.forEach(error.data, function (value) {
                            errores += value;
                        });
                        $mdToast.show({
                            template: '<md-toast><span flex> Ediccion Fallida ' + errores + ' </span></md-toast>',
                            position: 'top right',
                            hideDelay: 5000
                        });
                    });
            });
        };

        function CreateController($mdDialog) {
            var vm = this;
            vm.integrante = {};

            vm.response = function () {
                $mdDialog.hide(vm.integrante);
            };

            vm.close = function () {
                $mdDialog.cancel();
            };
        }

        function EditController($mdDialog, integrante) {
            var vm = this;
            vm.integrante = integrante;
            vm.response = function () {
                $mdDialog.hide(vm.integrante);
            };

            vm.close = function () {
                $mdDialog.cancel();
            };
        }
    }
})();