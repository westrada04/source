(function () {
    'use strict';

    angular
        .module('app.aplicacion.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope, UserService) {
        var vm = this;

        vm.login = login;
        vm.roles = roles;

        vm.loginForm = {
            email: 'westrada04@gmail.com',
            password: '123456789',
            rol: ''
        };

        vm.titleModule = 'General';
        vm.descriptionModule = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis diam id dui malesuada iaculis. Etiam non nisi ante. Vivamus nisl arcu, efficitur vestibulum nulla et, consequat posuere erat. Etiam semper elit vel commodo aliquet.Sed id sem ac nisi accumsan efficitur. Mauris in nisl neque.';
        vm.myImg1 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=General&w=170&h=170';
        vm.myImg2 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=General&w=170&h=170';

        function roles() {

            switch (vm.loginForm.rol) {
                case 'ESTUDIANTE':
                    vm.titleModule = 'Estudiante';
                    vm.descriptionModule = 'Quisque eros lorem, ornare sed cursus eu, maximus sed velit. Morbi egestas ipsum at erat bibendum, id imperdiet lorem mollis. Vivamus ornare imperdiet nunc. Cras iaculis leo in viverra blandit. Cras nec ullamcorper magna, sit amet blandit felis. Nulla facilisi. Fusce a molestie purus, at porta nibh. Nunc venenatis eleifend posuere.';
                    vm.myImg1 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Estudiante&w=170&h=170';
                    vm.myImg2 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Estudiante&w=170&h=170';
                    break;
                case 'DOCENTE':
                    vm.titleModule = 'Docente';
                    vm.descriptionModule = 'Nullam suscipit imperdiet ante. Duis fermentum sit amet sem iaculis commodo. Nulla facilisi. Sed non lectus nunc. In pharetra, augue ut gravida placerat, massa nibh ultrices metus, at ultrices nibh lacus vel libero. Donec non sollicitudin turpis, at aliquet nibh. Mauris vitae tellus massa.';
                    vm.myImg1 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Docente&w=170&h=170';
                    vm.myImg2 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Docente&w=170&h=170';
                    break;
                case 'ADMINISTRADOR':
                    vm.titleModule = 'Administrativo';
                    vm.descriptionModule = 'Maecenas id pellentesque risus. Suspendisse imperdiet arcu sit amet libero placerat placerat. In hac habitasse platea dictumst. Nam a maximus turpis. Sed gravida libero facilisis suscipit posuere. Nunc orci nisi, maximus eu metus vel, consequat mattis risus.';
                    vm.myImg1 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Administrativo&w=170&h=170';
                    vm.myImg2 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=Administrativo&w=170&h=170';
                    break;
                default:
                    vm.titleModule = 'General';
                    vm.descriptionModule = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis diam id dui malesuada iaculis. Etiam non nisi ante. Vivamus nisl arcu, efficitur vestibulum nulla et, consequat posuere erat. Etiam semper elit vel commodo aliquet.Sed id sem ac nisi accumsan efficitur. Mauris in nisl neque.';
                    vm.myImg1 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=General&w=170&h=170';
                    vm.myImg2 = 'https://placeholdit.imgix.net/~text?txtsize=50&txt=General&w=170&h=170';
            }

        }

        function login() {
            UserService.login(vm.loginForm);
        }
    }
})();
