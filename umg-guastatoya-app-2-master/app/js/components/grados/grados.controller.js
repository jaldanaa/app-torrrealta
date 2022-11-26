(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('gradosController', gradosController)
        .component('grados', {
            templateUrl: [function () {
                return 'js/components/grados/grados.html';
            }],
            controller: 'gradosController',
            controllerAs: 'vm', //View Model
            bindings: {
                grados: '<'
            }
        });
    
    gradosController.$inject = ['AuthenticationService', 'GradosService', '$state'];

    function gradosController(authenticationService, gradosService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.gradosService = gradosService;
            
        }

      
    }

})();