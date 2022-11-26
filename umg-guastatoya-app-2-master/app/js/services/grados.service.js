(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('GradosService', GradosService);
    
    GradosService.$inject = ['GradosRepository', 'InscripcionService','$filter', '$state'];

    function GradosService(GradosRepository, InscripcionService,$filter, $state) {
        var service = this;

        var service = {
            getGrados: getGrados,
            getFormData: getFormData,
            guardarGrado: guardarGrado,
            getCursos:getCursos,
            getNotasAlumno,
            grados: [],
            cursos: [],
            notas:[]
        };

        return service;


        // Devuelve todos los usuarios
        function getGrados() {
            return GradosRepository.getGrados().then(function(response) {
                service.grados = response.data;
                return service.grados;
            }).catch(handleError);
        }

        // Funcion que se usa para manejar los errores de los endpoints de usuarios, si devuelve 403 (forbidden) significa que no tiene acceso al endpoint y se redirige al inicio
        function handleError(error) {
            if (error.status === 403) {
                $state.go('grados', {});
            }
            return error;
        }

        // Funcion que arma un formdata para que este pueda ser enviado a travez de la peticion ajax incluyendo la imagen
        function getFormData(model) {
            var formData = new FormData();
            formData.append('grado', model.grado);
            formData.append('nivel_educativo', model.nivel_educativo);
            
            return formData;
        }
        
        function guardarGrado(gradoModel) {
            return GradosRepository.guardarGrado(gradoModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        function getCursos(gradoId) {
            return GradosRepository.getCursos(gradoId).then(function (response) {
                service.cursos = response.data;
                console.log(response);
                return service.cursos; 
            }).catch(function (error) {
                return error;
            })
        }
        function getNotasAlumno(alumnoId, ciclo) {
            console.log(alumnoId);
            return GradosRepository.getNotasAlumno(alumnoId, ciclo).then(function (response) {
                service.notas = response.data;
                console.log(response);
                return service.notas; 
            }).catch(function (error) {
                return error;
            })
        }
        
    }


})();