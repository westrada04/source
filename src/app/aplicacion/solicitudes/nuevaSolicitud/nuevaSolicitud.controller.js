(function () {
    'use strict';

    angular
        .module('app.aplicacion.nuevaSolicitud')
        .controller('NuevaSolicitudController', NuevaSolicitudController);

    /* @ngInject */
    function NuevaSolicitudController($timeout, $mdToast, Upload, API_BACKEND) {
        var vm = this;
        vm.filtrar = '';
        vm.status = 'idle'; // idle | uploading | complete
        vm.disabledForm = disabledForm;
        vm.upload = upload;
        vm.onSearchChange = onSearchChange;
        vm.change = change;
        vm.enviar = enviar;
        vm.solicitud;
        vm.descripcion;
        
        vm.solicitudes = [
            'Validación de practicas profesionales',
            'Inscripción de diplomado como opción de grado',
            'Inscripción de trabajo de investigación como opción de grado',
            'Inscripción de anteproyecto como opción de grado',
            'Solicitud de cancelación de anteproyecto',
            'Inscripción de tesis como opción de grado',
            'Inscripción al listado de diplomado como opción de grado',
            'Validación de asignatura',
            'Solicitud personalizada'
        ];

        vm.fileList;
        ////////////////

        function disabledForm(form) {
            return (form && (vm.fileList || vm.personalizar)) ? false : true;
        }

        function change() {
            if (vm.solicitud == 'Validación de asignatura') {
                vm.validacion = true;
                vm.personalizar = false;
            } else if (vm.solicitud == 'Solicitud personalizada') {
                vm.personalizar = true;
                vm.validacion = false;
            } else {
                vm.personalizar = false;
                vm.validacion = false;
            }
        }

        function upload($files) {
            if ($files !== null && $files.length > 0) {
                vm.fileList = $files;
                uploadStarted();
                $timeout(uploadComplete, 2000);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';
            var message = 'Gracias por !';
            for(var file in vm.fileList){
                message += vm.fileList[file].name + ' ';
            }
            
            $mdToast.show({
                template: '<md-toast><span flex>' + message + '</span></md-toast>',
                position: 'bottom right',
                hideDelay: 5000
            });

        }

        function onSearchChange(event) {
            event.stopPropagation();
        }

        function enviar() {
            var solicitud = '';
            if(vm.validacion){
                solicitud = vm.solicitud + ' ' + vm.asignatura;
            }else if (vm.personalizar){
                solicitud = vm.personalizada;
            }else{
                solicitud = vm.solicitud;
            }
            
            console.log(solicitud);
            
            Upload.upload({
                url: API_BACKEND.url +'/cargar',
                data: {
                    file : vm.fileList,
                    solicitud : solicitud,
                    descripcion : vm.descripcion
                },
                method: 'post'
            }).then(function (data) {
                console.log(data);
                console.log(vm.fileList);
            }, function (data) {
                console.log('error' + data);
            }, function (data) {
                var progressPercentage = parseInt(100.0 * data.loaded / data.total);
                console.log('progreso: ' + progressPercentage + '% ' + data.config.data.file.name);
            });
        }

    }

})();
