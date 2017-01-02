(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $authProvider , API_BACKEND ) {
        // Setup the apps routes

        // 404 & 500 pages
        $stateProvider
            .state('404', {
                url: '/404',
                views: {
                    'root': {
                        templateUrl: '404.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

        .state('401', {
            url: '/401',
            views: {
                'root': {
                    templateUrl: '401.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        })

        .state('500', {
            url: '/500',
            views: {
                'root': {
                    templateUrl: '500.tmpl.html',
                    controller: 'ErrorPageController',
                    controllerAs: 'vm'
                }
            }
        });

        $authProvider.loginUrl = API_BACKEND.url + '/auth/login';
        $authProvider.signupUrl = API_BACKEND.url + '/auth/signup';

        // set default routes when no path specified
        $urlRouterProvider.when('', '/iniciar-session');
        $urlRouterProvider.when('/', '/iniciar-session');

        // always goto 404 if route not found
        $urlRouterProvider.otherwise('/404');
    }
})();
