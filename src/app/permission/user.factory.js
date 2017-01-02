(function () {
    'use strict';

    angular
        .module('app.permission')
        .factory('UserService', UserService);

    /* @ngInject */
    function UserService($q, $http, RoleStore, $auth, $localStorage, $mdToast, $location, $state, $timeout) {


        var service = {
            getCurrentUser: getCurrentUser,
            hasPermission: hasPermission,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            authenticatedUser: authenticatedUser
        };

        return service;

        ///////////////

        function authenticatedUser() {
            var deferred = $q.defer();

            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $timeout(function () {
                    $state.go('template.login');
                });
                deferred.reject();
            }
            return deferred.promise;
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function cacheSession(user, rol) {
            $localStorage.email = user.email;
            $localStorage.nombres = user.nombres;
            $localStorage.apellidos = user.apellidos;
            $localStorage.role = rol;
        }

        function uncacheSession() {
            $localStorage.$reset();
        }

        function getCurrentUser() {
            var currentUser = {
                displayName: $localStorage.nombres,
                username: $localStorage.nombres,
                avatar: 'assets/images/avatars/avatar-5.png',
                roles: $localStorage.role
            };
            return currentUser;
        }

        function hasPermission(permission) {
            var deferred = $q.defer();
            var hasPermission = false;
            var currentUser = getCurrentUser();

            // check if user has permission via its roles

            var role = currentUser.roles;
            // check role exists
            if (RoleStore.hasRoleDefinition(role)) {
                // get the role
                var roles = RoleStore.getStore();

                if (angular.isDefined(roles[role])) {
                    // check if the permission we are validating is in this role's permissions
                    if (-1 !== roles[role].validationFunction.indexOf(permission)) {
                        hasPermission = true;
                    }
                }
            }

            // if we have permission resolve otherwise reject the promise
            if (hasPermission) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        function logout() {
            $auth.logout();
            uncacheSession();
            $mdToast.show({
                template: '<md-toast><span flex>Sesión Finalizada con Exito</span></md-toast>',
                position: 'top right',
                hideDelay: 5000
            });

            $state.go('template.login');
        }

        function login(loginForm) {

            $auth.login(loginForm)
                .then(function (response) {

                    cacheSession(response.data.user, response.data.rol);

                    $mdToast.show({
                        template: '<md-toast><span flex>Sesión Iniciada con Exito</span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });

                    $state.go('triangular.nueva-acta');
                })
                .catch(function () {
                    $mdToast.show({
                        template: '<md-toast><span flex>Email o Contraseña invalida</span></md-toast>',
                        position: 'top right',
                        hideDelay: 5000
                    });
                });
        }
    }
})();
