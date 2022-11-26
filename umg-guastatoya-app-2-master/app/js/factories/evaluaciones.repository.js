(function () {
    'use strict';

    angular.module('UniversidadApp')
        .factory('EvaluacionesRepository', EvaluacionesRepository);

    EvaluacionesRepository.$inject = ['$http', '$q', 'apiUrl', 'AuthenticationService'];

    function EvaluacionesRepository($http, $q, apiUrl, authenticationService) {
        var repository = {
            guardarEvaluacion: guardarEvaluacion,
            getCursos: getCursos,
            getEvaluaciones: getEvaluaciones,
            getEvaluacion: getEvaluacion,
            editarEvaluacion: editarEvaluacion,
            resolverEvaluacion: resolverEvaluacion,
            getEvaluacionesResueltas: getEvaluacionesResueltas,
            getEvaluacionResuelta: getEvaluacionResuelta
        };

        return repository;

        function resolverEvaluacion(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'evaluaciones/solve/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function guardarEvaluacion(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'evaluaciones/create/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function editarEvaluacion(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'evaluaciones/update/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getCursos() {
            return $http({
                method: 'GET',
                url: apiUrl + 'evaluaciones/cursos/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getEvaluaciones() {
            return $http({
                method: 'GET',
                url: apiUrl + 'evaluaciones/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getEvaluacionesResueltas() {
            return $http({
                method: 'GET',
                url: apiUrl + 'evaluaciones/resueltas/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getEvaluacionResuelta(evaluacionId) {
            return $http({
                method: 'GET',
                url: apiUrl + 'evaluaciones/resueltas/' + evaluacionId,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getEvaluacion(evaluacionId) {
            return $http({
                method: 'GET',
                url: apiUrl + 'evaluaciones/' + evaluacionId,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function error(response) {
            authenticationService.verifyErrorType(response.data, 'evaluaciones');
            return $q.reject(response);
        }

    }

})();