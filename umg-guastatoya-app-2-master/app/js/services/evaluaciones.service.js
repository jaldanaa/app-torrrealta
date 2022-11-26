(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('EvaluacionesService', EvaluacionesService);
    
    EvaluacionesService.$inject = ['EvaluacionesRepository', '$filter'];

    function EvaluacionesService(EvaluacionesRepository, $filter) {
        var service = this;

        service.guardarEvaluacion = guardarEvaluacion;
        service.getCursos = getCursos;
        service.getEvaluaciones = getEvaluaciones;
        service.getEvaluacion = getEvaluacion;
        service.editarEvaluacion = editarEvaluacion;
        service.resolverEvaluacion = resolverEvaluacion;
        service.getEvaluacionesResueltas = getEvaluacionesResueltas;
        service.getEvaluacionResuelta = getEvaluacionResuelta;

        return service;

        // Funcion que devuelve un array con las respuestas que tengan ids dentro de una evaluacion que se esta resolviendo
        function cleanModel(data) {
            var cleanAnswers = $filter('filter')(data.respuestas, function (id) {
                return id;
            });
            data.respuestas = cleanAnswers;
            return data;
        }

        // Recibe el modelo de la evaluacion y lo envia al repositorio respectivo
        function guardarEvaluacion(evaluacionModel) {
            return EvaluacionesRepository.guardarEvaluacion(evaluacionModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        // Recibe el modelo de la evaluacion y lo envia al repositorio respectivo
        function editarEvaluacion(evaluacionModel) {
            return EvaluacionesRepository.editarEvaluacion(evaluacionModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        // Obtiene las evaluaciones
        function getEvaluaciones() {
            return EvaluacionesRepository.getEvaluaciones().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        // Obtiene las evaluaciones resueltas
        function getEvaluacionesResueltas() {
            return EvaluacionesRepository.getEvaluacionesResueltas().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        // Obtiene una evaluacion por id
        function getEvaluacion(evaluacionId) {
            return EvaluacionesRepository.getEvaluacion(evaluacionId).then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        // Obtiene las evaluaciones resueltas
        function getEvaluacionResuelta(evaluacionId) {
            return EvaluacionesRepository.getEvaluacionResuelta(evaluacionId).then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        // Obtiene todos los cursos
        function getCursos() {
            return EvaluacionesRepository.getCursos().then(function(response) {
                return response.data;
            }).catch(function(error) {
                return error;
            });
        }

        // Envia data limpia para guardar una evaluacion resuelta
        function resolverEvaluacion(data) {
            var cleanData = cleanModel(data);
            return EvaluacionesRepository.resolverEvaluacion(cleanData).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

    }

})();