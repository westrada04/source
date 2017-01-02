(function () {
    'use strict';

    angular
        .module('app.aplicacion.nueva-acta', [])
        .filter('custom', custom);

    function custom() {
        return function (input, search) {
            if (!input) return input;
            if (!search) return input;
            var expected = ('' + search).toLowerCase();
            var result = {};
            angular.forEach(input, function (value, key) {
                var actual = ('' + value).toLowerCase();
                if (actual.indexOf(expected) !== -1) {
                    result[key] = value;
                }
            });
            return result;
        }
    }

})();
