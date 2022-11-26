(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('inscripcionFormController', inscripcionFormController)
        .component('inscripcionForm', {
            templateUrl: [function () {
                return 'js/components/inscripcionForm/inscripcionForm.html';
            }],
            controller: 'inscripcionFormController',
            controllerAs: 'vm', //View Model
            bindings: { // resolve desde la ruta
                inscripcion: '<',
                alumno: '<'
            }
        });
    
        inscripcionFormController.$inject = ['AuthenticationService', 'InscripcionService', '$scope', '$state'];

    function inscripcionFormController(authenticationService, InscripcionService,$scope,  $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {            
            vm.authenticationService = authenticationService;
            vm.InscripcionService = InscripcionService;

            vm.guardarInscripcion = guardarInscripcion;
            
            setRepresentanteModel();
            setAlumnoModel ();
        }

        // Definicion del modelo de la grado inicial
        function setRepresentanteModel () {
            vm.representanteModel = {
                nombres: '',
                apellidos: '',
                dpi: '',
                direccion: '',
                telefono: '',
                sexo: '',
                estado_civil: '',
                parentesco_alumno: ''
            }
            if (!vm.representante) {
                return;
            }
            vm.representanteModel = {
                nombres: vm.inscripcion.nombres,
                apellidos: vm.inscripcion.apellidos,
                dpi: vm.inscripcion.dpi,
                direccion: vm.inscripcion.direccion,
                telefono: vm.inscripcion.telefono,
                sexo: vm.inscripcion.sexo,
                estado_civil: vm.inscripcion.estado_civil,
                parentesco_alumno: vm.inscripcion.parentesco_alumno
            }
        }

        function setAlumnoModel () {
            vm.alumnoModel = {
                nombres: '',
                apellidos: '',
                fecha_nacimiento: null,
                telefono: '',
                direccion: '',
                nacionalidad: '',
                sexo: '',
                partida_nacimiento: null,
                padre_representantes: null
            }
            if (!vm.representante) {
                return;
            }
            vm.alumnoModel = {
                nombres: vm.alumno.nombres,
                apellidos: vm.alumno.apellidos,
                fecha_nacimiento: vm.alumno.fecha_nacimiento,
                telefono: vm.alumno.telefono,
                direccion: vm.alumno.direccion,
                nacionalidad: vm.alumno.nacionalidad,
                sexo: vm.alumno.sexo,
                partida_nacimiento: vm.alumno.partida_nacimiento
            }
        }

        function guardarInscripcion () {
            // Verificar si el formulario es valido o contiene algun error de validacion
            if (vm.inscripcionForm.$invalid) {
                return;
            }            
            
                InscripcionService.guardarInscripcion(vm.representanteModel, vm.alumnoModel).then(function(response) {
                    console.log(vm.alumnoModel);
                    if (response.status === 201) {
                        console.log('"response.padres_representantes"')
                        console.log("response.padres_representantes")
                        console.log(response.data)
                        console.log('"response.padres_representantes"')
                        console.log("response.padres_representantes")
                        console.log(response)
                        alert('Registro guardado con exito');
                        $state.go('alumnos', {});
                    }else{
                    alert('Ha ocurrido un error');
                    $state.go('alumnos', {});
                    }
                }).catch(function(error) {
                    alert('No se pudo guardar el registro, intente nuevamente')
                });
            }
        }

})();