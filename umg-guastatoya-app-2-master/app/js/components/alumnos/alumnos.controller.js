(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('alumnosController', alumnosController)
        .component('alumnos', {
            templateUrl: [function () {
                return 'js/components/alumnos/alumnos.html';
            }],
            controller: 'alumnosController',
            controllerAs: 'vm', //View Model
            bindings: {
                alumnos: '<'
            }
        });
    
        alumnosController.$inject = ['AuthenticationService', 'InscripcionService', '$state'];

    function alumnosController(authenticationService, InscripcionService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.InscripcionService = InscripcionService;
            
        }

      
    }

})();