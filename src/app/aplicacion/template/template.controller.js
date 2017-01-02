(function () {
    'use strict';

    angular
        .module('app.aplicacion.template')
        .controller('TemplateController', TemplateController);

    /* @ngInject */
    function TemplateController($mdSidenav) {
        var vm = this;

        vm.showMobileMainHeader = true;

        vm.openSideNavPanel = function () {
            $mdSidenav('left').open();
        };

        vm.closeSideNavPanel = function () {
            $mdSidenav('left').close();
        };
    }
})();
