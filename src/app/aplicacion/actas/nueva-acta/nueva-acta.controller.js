(function () {
    'use strict';

    angular
        .module('app.aplicacion.nueva-acta')
        .controller('NuevaActaController', NuevaActaController);

    /* @ngInject */
    function NuevaActaController($mdDialog, $http, API_BACKEND, $mdToast) {
        var vm = this;
        vm.data = {};
        vm.onSearchChange = onSearchChange;
        vm.changeIntegrantes = changeIntegrantes;
        vm.changeInvitados = changeInvitados;
        vm.changeSolicitudes = changeSolicitudes;
        vm.selectedIntegrantes = [];
        vm.selectedInvitados = [];
        vm.selectedSolicitudes = [];
        vm.crearInvitado = crearInvitado;
        vm.crearSolicitud = crearSolicitud;
        vm.enviar = enviar;
        vm.integrantes = [
            {
                id: 1,
                nombres: 'wilmer omar',
                apellidos: 'estrada diaz',
                cargo: 'representante estudiantil principal'
            },
            {
                id: 2,
                nombres: 'monje omar',
                apellidos: 'estrada quintero',
                cargo: 'representante estudiantil suplente'

            },
            {
                id: 3,
                nombres: 'ines del carmen',
                apellidos: 'meriño fuentes',
                cargo: 'director de programa'
            },
            {
                id: 4,
                nombres: 'pedro dsd',
                apellidos: 'martinez dds',
                cargo: 'representante docente principal'
            },
            {
                id: 5,
                nombres: 'jose ds',
                apellidos: 'castro dsd',
                cargo: 'representante docente suplente'
            },
            {
                id: 6,
                nombres: 'mario ds',
                apellidos: 'lopez dsd',
                cargo: 'representante egresado principal'
            },
            {
                id: 7,
                nombres: 'pablo dssd',
                apellidos: 'diaz dsad',
                cargo: 'representante egresado suplente'
            },
            {
                id: 8,
                nombres: 'pablo dssd',
                apellidos: 'diaz dsad',
                cargo: 'Coordinador de programa'
            }
        ];

        vm.invitados = [
            {
                id: 1,
                nombres: 'carlos jose',
                apellidos: 'alvarez montoya',
                profesion: 'docente'
            },
            {
                id: 2,
                nombres: 'pedro julian',
                apellidos: 'muños beltran',
                profesion: 'estudiante'
            },
            {
                id: 3,
                nombres: 'maria andrea',
                apellidos: 'perez roa',
                profesion: 'ingeniero'
            }
        ];

        vm.solicitudes = [
            {
                id: 1,
                nombre: 'wilmer omar estrada diaz',
                solicitud: 'Validacion de Practicas Profesionales',
                descripcion: 'descripcion opcional'
            },
            {
                id: 2,
                nombre: 'Jeferson Bustamante Alvarez',
                solicitud: 'Vaidacion de Asignatura Ecuaciones Diferenciales',
                descripcion: ''
            },
            {
                id: 2,
                nombre: 'Jeferson Bustamante Alvarez',
                solicitud: 'Vaidacion de Asignatura Ecuaciones Diferenciales',
                descripcion: ''
            },
            {
                id: 2,
                nombre: 'Jeferson Bustamante Alvarez',
                solicitud: 'Vaidacion de Asignatura Ecuaciones Diferenciales',
                descripcion: ''
            },
            {
                id: 2,
                nombre: 'Jeferson Bustamante Alvarez',
                solicitud: 'Vaidacion de Asignatura Ecuaciones Diferenciales',
                descripcion: ''
            }
        ];

        vm.lugares = [
            {
                id: 1,
                nombre: 'Oficina Central'
            },
            {
                id: 2,
                nombre: 'Oficina del decano'
            },
            {
                id: 3,
                nombre: 'Biblioteca'
            }
        ];

        function changeIntegrantes(integrante) {
            var index = vm.selectedIntegrantes.indexOf(integrante.id);

            if (index == -1) {
                vm.selectedIntegrantes.push(integrante.id);
            } else {
                vm.selectedIntegrantes.splice(index, 1);
            }

            console.log("Integrantes " + vm.selectedIntegrantes);
        }

        function changeInvitados(invitado) {
            var index = vm.selectedInvitados.indexOf(invitado.id);

            if (index == -1) {
                vm.selectedInvitados.push(invitado.id);
            } else {
                vm.selectedInvitados.splice(index, 1);
            }
            console.log("Invitados " + vm.selectedInvitados);
        }

        function changeSolicitudes(solicitud) {
            var index = vm.selectedSolicitudes.indexOf(solicitud.id);

            if (index == -1) {
                vm.selectedSolicitudes.push(solicitud.id);
            } else {
                vm.selectedSolicitudes.splice(index, 1);
            }
            console.log("solicitudes " + vm.solicitudes);
        }

        function crearInvitado(ev) {
            $mdDialog.show({
                controller: CreateInvitadoController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/actas/nueva-acta/invitado-create.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (response) {
                console.log(response);
                vm.invitados.push(response);
                /*
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
                    */
            });
        };

        function CreateInvitadoController($mdDialog) {
            var vm = this;
            vm.invitado = {};

            vm.response = function () {
                $mdDialog.hide(vm.invitado);
                /*
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
                    */
            };
            vm.close = function () {
                $mdDialog.cancel();
            };
        };

        function crearSolicitud(ev) {
            $mdDialog.show({
                controller: CreateSolicitudController,
                controllerAs: 'vm',
                templateUrl: 'app/aplicacion/actas/nueva-acta/solicitud-create.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (response) {
                console.log(response);
                vm.solicitudes.push(response);
                /*
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
                    */
            });
        };

        function CreateSolicitudController($mdDialog) {
            var vm = this;
            vm.solicitud = {};

            vm.response = function () {
                $mdDialog.hide(vm.solicitud);
                /*
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
                    */
            };
            vm.close = function () {
                $mdDialog.cancel();
            };
        }

        function enviar() {
            vm.objeto = {
                fecha: vm.fecha,
                integrantes: vm.selectedIntegrantes,
                invitados: vm.selectedInvitados,
                solicitudes: vm.selectedSolicitudes,
                lugar: vm.lugar,
                horaInicial: vm.horaInicial,
                horaFinal: vm.horaFinal
            }
            console.log(vm.objeto);
            //     $http.post(API_BACKEND.url + '/direccion',)
        }

        function onSearchChange(event) {
            event.stopPropagation();
        }

    }
})();
