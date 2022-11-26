(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionResueltaController', evaluacionResueltaController)
        .component('evaluacionResuelta', {
            templateUrl: [function () {
                return 'js/components/evaluacionResuelta/evaluacionResuelta.html';
            }],
            controller: 'evaluacionResueltaController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluacionResuelta: '<' // resolve que se define desde la ruta en configs
            }
        });
    
    evaluacionResueltaController.$inject = ['AuthenticationService', 'EvaluacionesService', '$state'];

    function evaluacionResueltaController(authenticationService, EvaluacionesService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            if (vm.evaluacionResuelta.status === 404) {
                $state.go('evaluacionesResueltas', {});
            }
            vm.authenticationService = authenticationService;
            vm.evaluacionesService = EvaluacionesService;

        }

    }

})();