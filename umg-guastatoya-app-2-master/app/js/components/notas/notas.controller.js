(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('notasController', notasController)
        .component('notas', {
            templateUrl: [function () {
                return 'js/components/notas/notas.html';
            }],
            controller: 'notasController',
            controllerAs: 'vm', //View Model
            bindings: { // resolve desde la ruta
                grados: '<',
                cursos: '<',
                notas: '<',
                alumnos: '<'
            }
        });
    
        notasController.$inject = ['AuthenticationService', 'InscripcionService', 'GradosService','$state'];

    function notasController(authenticationService, InscripcionService, gradosService, $state) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit() {
            vm.authenticationService = authenticationService;
            vm.gradosService = gradosService;
            vm.getAlumnosGrado = getAlumnosGrado;
            vm.getCursos=getCursos;
            setNotasModel();
        }

        // Definicion del modelo de la grado inicial
        function setNotasModel () {
            vm.notaModel = {
                idCurso: null,
                idAsignacion: null,
                nota: null
            }
            if (!vm.notas) {
                return;
            }
            vm.notaModel = {
                idCurso: vm.notas.idCurso,
                idAsignacion: vm.notas.idAsignacion,
                nota: vm.notas.nota
            }
        }

        function getAlumnosGrado(gradoid, ciclo) {
            console.log('se llamo a la funcion '+gradoid);
            InscripcionService.getAlumnosGrado(gradoid, ciclo).then(function(response) {
                vm.alumnos = response;
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
        }

        function getCursos(idGrado, alumno, ciclo) {
            console.log('idAlumno'+alumno)
            console.log('ciclo'+ciclo)
            $state.go('nota', {id: idGrado, alumno: alumno, ciclo: ciclo});
        }

        }

})();