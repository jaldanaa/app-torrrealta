(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionesController', evaluacionesController)
        .component('evaluaciones', {
            templateUrl: [function () {
                return 'js/components/evaluaciones/evaluaciones.html';
            }],
            controller: 'evaluacionesController',
            controllerAs: 'vm', //View Model
            bindings: {
                evaluaciones: '<' // resolve que se ejecuta desde la ruta
            }
        });
    
    evaluacionesController.$inject = ['AuthenticationService', '$state'];

    function evaluacionesController(authenticationService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            
            vm.editarEvaluacion = editarEvaluacion;
            vm.resolverEvaluacion = resolverEvaluacion;
        }

        function editarEvaluacion(evaluacionId) {
            // redireccionar a la evaluacion para editar
            $state.go('evaluacion', {id: evaluacionId});
        }

        function resolverEvaluacion(evaluacionId) {
            // redireccionar hacia el componente para resolver la evaluacion
            $state.go('evaluacionResolver', {id: evaluacionId});
        }
    }

})();