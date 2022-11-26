(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionesResueltasController', evaluacionesResueltasController)
        .component('evaluacionesResueltas', {
            templateUrl: [function () {
                return 'js/components/evaluacionesResueltas/evaluacionesResueltas.html';
            }],
            controller: 'evaluacionesResueltasController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluacionesResueltas: '<' // resolve que se obtiene desde la ruta en config
            }
        });
    
    evaluacionesResueltasController.$inject = ['AuthenticationService', '$state'];

    function evaluacionesResueltasController(authenticationService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.verEvaluacionResuelta = verEvaluacionResuelta;   
        }

        function verEvaluacionResuelta (evaluacionId) {
            // redireccion para visualizar la evaluacion resuelta
            $state.go('evaluacionResuelta', {id: evaluacionId});
        }
    }

})();