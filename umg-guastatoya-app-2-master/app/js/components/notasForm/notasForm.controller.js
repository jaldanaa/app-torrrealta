(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('notasFormController', notasFormController)
        .component('notasForm', {
            templateUrl: [function () {
                return 'js/components/notasForm/notasForm.html';
            }],
            controller: 'notasFormController',
            controllerAs: 'vm', //View Model
            bindings: { // resolve desde la ruta
                grados: '<',
                cursos: '<',
                notas: '<'
            }
        });
    
        notasFormController.$inject = ['AuthenticationService', 'AsignacionService','InscripcionService', 'GradosService','$state', '$stateParams'];

    function notasFormController(authenticationService, AsignacionService,InscripcionService, gradosService, $state, $stateParams) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {            
            vm.authenticationService = authenticationService;
            vm.AsignacionService = AsignacionService;
            vm.gradosService = gradosService;
            vm.getCursos = getCursos;
            vm.guardarNota =guardarNota;
            vm.getNotasAlumno=getNotasAlumno;
            setNotaModel();
            
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

            function setNotaModel () {
                vm.notaModel = {
                    nota: '',
                    ciclo:'',
                    alumno: null,
                    curso: null
                }
                if (!vm.nota) {
                    return;
                }
                vm.notaModel = {
                    nota: null,
                    ciclo: null,
                    alumno: null,
                    curso: null
                }
            }

            function guardarNota (curso,nota){
                vm.notaModel.alumno= $stateParams.alumno;
                vm.notaModel.curso= curso;
                vm.notaModel.ciclo= $stateParams.ciclo;
                vm.notaModel.nota= nota;
                console.log(nota);
                console.log(vm.notaModel);
                InscripcionService.guardarNota(vm.notaModel).then(function(response) {
                    if (response.status === 201) {
                        alert('Registro guardado con exito');
                        }
                    }).catch(function(error) {
                        console.log(error);
                            alert('No se pudo guardar el registro, intente nuevamente')
                });
                    
            }

            function getNotasAlumno() {
                console.log('se llamo a la funcion getNotasAlumno');
                gradosService.getNotasAlumno($stateParams.alumno, $stateParams.ciclo).then(function(response) {
                    vm.notas = response;
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                })
            }


        }

})();