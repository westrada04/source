(function () {
    'use strict';

    angular
        .module('app.aplicacion.usuarios')
        .controller('UsuariosController', UsuariosController);

    /* @ngInject */
    function UsuariosController(UsersResponse, UsersService, $mdDialog, $http, API_BACKEND, $mdToast) {
        var vm = this;

        vm.users = UsersResponse.data;
        vm.size = vm.users.length;
        vm.selected = [];
        vm.limitOptions = [5, 10, 15];
        
        vm.removeFilter = removeFilter;
        vm.load = load;
        vm.remove = remove;
        vm.crearUsuario = crearUsuario;
        vm.editarUsuario = editarUsuario;
        
        vm.query = {
            filter: '',
            limit: 5,
            order: 'id',
            page: 1
        };

        vm.label = {
            page: 'Página:',
            rowsPerPage: 'Filas por página:',
            of: 'de'
        };

        vm.columnas = {
            id: '#',
            nombres: 'Nombres',
            apellidos: 'Apellidos',
            email: 'Email',
            rol: 'Rol',
            telefono: 'Telefono'
        };

        vm.filter = {
            options: {
                debounce: 500
            }
        };

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        };

        function load() {
            vm.promise = UsersService.getAllUsuarios();
            vm.promise.then(function (response) {
                vm.users = response.data;
                $mdToast.show({
                    template: '<md-toast><span flex>Registros Actualizados</span></md-toast>',
                    position: 'top right',
                    hideDelay: 5000
                });
            });
        };

        function remove(ev) {
            if (vm.selected.length == 1) {
                var confirmar = $mdDialog.confirm()
                    .title('Seguro de eliminar este usuario?')
                    .textContent('')
                    .targetEvent(ev)
                    .cancel('Cancelar')
                    .clickOutsideToClose(true)
                    .ok('Eliminar');
                $mdDialog.show(confirmar).then(function () {
                    eliminarUser();
                });
            } else {
                var confirmar = $mdDialog.confirm()
                    .title('Seguro de eliminar estos usuarios?')
                    .textContent('')
                    .targetEvent(ev)
                    .cancel('Cancelar')
                    .clickOutsideToClose(true)
                    .ok('Eliminar');
                $mdDialog.show(confirmar).then(function () {
                    eliminarUsers();
                });
            }
        };

        function eliminarUsers() {
            var usuarios = [];
            vm.selected.forEach(function (item) {
                usuarios.push(item.id);
            });
            var objeto = {
                'usuarios': usuarios
            };

            $http.post(API_BACKEND.url + '/destroyUsers', objeto)
                .then(function () {
                    for (var x = 0; x < usuarios.length; x++) {
                        for (var y = vm.users.length - 1; y >= 0; y--) {
                            if (vm.users[y].id == usuarios[x]) {
                                vm.users.splice(y, 1);
                            }
                        }
                    }
                    vm.size = vm.users.length;
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

        function eliminarUser() {
            $http.delete(API_BACKEND.url + '/user/' + vm.selected[0].id)
                .then(function () {
                    $mdToast.show({
                        template: '<md-toast><span flex>Usuario Eliminado Exitosamente</span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });
                    var index = vm.users.findIndex(buscar);
                    vm.users.splice(index, 1);
                    vm.size = vm.users.length;
                    vm.selected.length = 0;
                });
        }

        function buscar(element) {
            return element === vm.selected[0];
        }

        function crearUsuario(ev) {
            $mdDialog.show({
                controller: CreateController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/usuarios/usuarios.create.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (response) {

                $http.post(API_BACKEND.url + '/user', response)
                    .then(function (request) {
                        $mdToast.show({
                            template: '<md-toast><span flex>Registro Exitoso</span></md-toast>',
                            position: 'top right',
                            hideDelay: 5000
                        });
                        vm.size = vm.users.push(request.data);
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

        function editarUsuario(ev) {
            $mdDialog.show({
                controller: EditController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/usuarios/usuarios.edit.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {
                    usuario: angular.copy(vm.selected[0])
                }
            }).then(function (response) {

                $http.put(API_BACKEND.url + '/user/' + response.id, response)
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
            vm.usuario = {};

            vm.response = function () {
                $http.post(API_BACKEND.url + '/validarEmail', vm.usuario)
                    .then(function (response) {
                        if (response.data) {
                            $mdDialog.hide(vm.usuario);
                        } else {
                            $mdToast.show({
                                template: '<md-toast><span flex>El email ya esta registrado!</md-toast>',
                                position: 'top right',
                                hideDelay: 5000
                            });
                        }
                    });
            };

            vm.close = function () {
                $mdDialog.cancel();
            };
        }

        function EditController($mdDialog, usuario) {
            var vm = this;
            vm.usuario = usuario;
            vm.response = function () {
                $http.post(API_BACKEND.url + '/validarEmailUser/' + vm.usuario.id, vm.usuario)
                    .then(function (response) {
                        if (response.data) {
                            $mdDialog.hide(vm.usuario);
                        } else {
                            $mdToast.show({
                                template: '<md-toast><span flex>El email ya esta registrado!</md-toast>',
                                position: 'top right',
                                hideDelay: 5000
                            });
                        }
                    });
            };

            vm.close = function () {
                $mdDialog.cancel();
            };
        }
    }
})();
