(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('asignacionFormController', asignacionFormController)
        .component('asignacionForm', {
            templateUrl: [function () {
                return 'js/components/asignacionForm/asignacionForm.html';
            }],
            controller: 'asignacionFormController',
            controllerAs: 'vm', //View Model
            bindings: { // resolve desde la ruta
                asignacion: '<',
                grados: '<',
                cursos: '<'
            }
        });
    
    asignacionFormController.$inject = ['AuthenticationService', 'AsignacionService', 'GradosService','$state'];

    function asignacionFormController(authenticationService, AsignacionService, gradosService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {            
            vm.authenticationService = authenticationService;
            vm.AsignacionService = AsignacionService;
            vm.gradosService = gradosService;
            vm.guardarAsignacion = guardarAsignacion;
            vm.getCursos = getCursos;
            
            setAsignacionModel();
        }

        // Definicion del modelo de la grado inicial
        function setAsignacionModel () {
            vm.asignacionModel = {
                ciclo: '',
                alumno: null,
                grado: null
            }
            if (!vm.asignacion) {
                return;
            }
            vm.asignacionModel = {
                ciclo: vm.asignacion.ciclo,
                alumno: vm.asignacion.alumno ,
                grado: vm.asignacion.grado
            }
        }

            function guardarAsignacion () {
            // Verificar si el formulario es valido o contiene algun error de validacion
            if (vm.asignacionForm.$invalid) {
                return;
            }            
            AsignacionService.guardarAsignacion(vm.asignacionModel).then(function(response) {
                    if (response.status === 201) {
                        alert('Registro guardado con exito');
                        $state.go('alumnos', {});
                    }
                }).catch(function(error) {
                    alert('No se pudo guardar el registro, intente nuevamente')
                });
            }

            function getCursos(gradoid) {
                console.log('se llamo a la funcion '+gradoid);
                gradosService.getCursos(gradoid).then(function(response) {
                    vm.cursos = response;
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                })
            }


        }

})();