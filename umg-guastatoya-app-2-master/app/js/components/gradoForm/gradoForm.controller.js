(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('gradoFormController', gradoFormController)
        .component('gradoForm', {
            templateUrl: [function () {
                return 'js/components/gradoForm/gradoForm.html';
            }],
            controller: 'gradoFormController',
            controllerAs: 'vm', //View Model
            bindings: { // resolve desde la ruta
                grado: '<'
            }
        });
    
    gradoFormController.$inject = ['AuthenticationService', 'GradosService', '$state'];

    function gradoFormController(authenticationService, GradosService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {            
            vm.authenticationService = authenticationService;
            vm.GradosService = GradosService;

            vm.guardarGrado = guardarGrado;
            
            setGradoModel();
        }

        // Definicion del modelo de la grado inicial
        function setGradoModel () {
            vm.gradoModel = {
                grado: '',
                nivel_educativo: ''
            }
            if (!vm.grado) {
                return;
            }
            vm.gradoModel = {
                grado: vm.grado.grado,
                nivel_educativo: vm.grado.nivel_educativo 
            }
        }

        function guardarGrado () {
            // Verificar si el formulario es valido o contiene algun error de validacion
            if (vm.gradoForm.$invalid) {
                return;
            }            
                GradosService.guardarGrado(vm.gradoModel).then(function(response) {
                    if (response.status === 201) {
                        alert('Registro guardado con exito');
                        $state.go('grados', {});
                    }
                }).catch(function(error) {
                    alert('No se pudo guardar el registro, intente nuevamente')
                });
            }
        }

})();