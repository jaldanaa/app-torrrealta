(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('evaluacionFormController', evaluacionFormController)
        .component('evaluacionForm', {
            templateUrl: [function () {
                return 'js/components/evaluacionForm/evaluacionForm.html';
            }],
            controller: 'evaluacionFormController',
            controllerAs: 'vm', //View Model
            bindings: {
                cursos: '<', // resolve desde la ruta
                evaluacion: '<'
            }
        });
    
    evaluacionFormController.$inject = ['AuthenticationService', 'EvaluacionesService', '$state'];

    function evaluacionFormController(authenticationService, EvaluacionesService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            if (authenticationService.currentUser.profile.tipo == 3) {
                $state.go('evaluaciones', {});
            }
            vm.authenticationService = authenticationService;
            vm.evaluacionesService = EvaluacionesService;
            
            vm.agregarPregunta = agregarPregunta;
            vm.agregarRespuesta = agregarRespuesta;
            vm.guardarEvaluacion = guardarEvaluacion;
            
            setEvaluacionModel();
        }

        // Definicion del modelo de la evaluacion inicial
        function setEvaluacionModel () {
            vm.evaluacionModel = {
                catedratico: authenticationService.currentUser.id,
                preguntas: [
                    {
                        titulo: '',
                        respuestas: [{
                            titulo: '',
                            correcto: false
                        }]
                    }
                ],
                titulo: '',
                curso: null
            }
            if (!vm.evaluacion) {
                return;
            }
            vm.evaluacionModel = {
                catedratico: vm.evaluacion.catedratico.id,
                preguntas: vm.evaluacion.preguntas,
                titulo: vm.evaluacion.titulo,
                curso: vm.evaluacion.curso.id,
                id: vm.evaluacion.id
            }
        }

        // Se agrega la estructura de una nueva pregunta
        function agregarPregunta() {
            vm.evaluacionModel.preguntas.push({
                titulo: '',
                respuestas: [{
                    titulo: '',
                    correcto: false
                }]
            })
        }
        
        // Se agrega una respuesta a una pregunta especifica
        function agregarRespuesta(preguntaIndex) {
            vm.evaluacionModel.preguntas[preguntaIndex].respuestas.push({
                titulo: '',
                correcto: false
            })
        }

        // Funcion que hace la llamada apropiada para guardar la evaluacion nueva
        function guardarEvaluacion () {
            vm.evaluacionForm.$submitted = true;
            // Verificar si el formulario es valido o contiene algun error de validacion
            if (vm.evaluacionForm.$invalid) {
                return;
            }
            // Si no hay una evaluacion existente, se esta editando, por lo tanto se hace la llamada correcta
            if (vm.evaluacion) {
                EvaluacionesService.editarEvaluacion(vm.evaluacionModel).then(function(response) {
                    if (response.status === 200) {
                        alert('Evaluacion editada con exito');
                    }
                }).catch(function(error) {
                    alert('No se pudieron guardar los cambios en la evaluacion, intente nuevamente')
                });
            }else{ // Si no hay una evaluacion existente, se guarda la nueva evaluacion
                EvaluacionesService.guardarEvaluacion(vm.evaluacionModel).then(function(response) {
                    console.log(response.status)
                    if (response.status === 200) {
                        alert('Evaluacion creada con exito');
                        $state.go('evaluaciones', {});
                    }
                }).catch(function(error) {
                    alert('No se pudo guardar la evaluacion, intente nuevamente')
                });
            }
        }
    }

})();