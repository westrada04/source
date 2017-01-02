(function () {
    'use strict';

    angular
        .module('app', [
            'ngMaterialDatePicker',
            'angular-toArrayFilter',
            'satellizer',
            'ngStorage',
            'ui.router',
            'triangular',
            'ngAnimate', 
            'ngCookies', 
            'ngSanitize', 
            'ngMessages', 
            'ngMaterial',
            'googlechart', 
            'chart.js', 
            'linkify', 
            'ui.calendar', 
            'angularMoment', 
            'textAngular', 
            'uiGmapgoogle-maps', 
            'hljs', 
            'md.data.table', 
            angularDragula(angular), 
            'ngFileUpload',
            'app.translate',
            'app.permission',
            'app.aplicacion'
        ])

        .constant('API_CONFIG', {
            'url': 'http://triangular-api.oxygenna.com/'
        })
        
        .directive('stringToNumber', function() {
            return {
                require: 'ngModel',
                    link: function(scope, element, attrs, ngModel) {
                        ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value);
                    });
                }
            };
        })
        
        //constante de url de backend
        .constant('API_BACKEND',{
            url: 'http://localhost/tesis/public'
        });
})();
