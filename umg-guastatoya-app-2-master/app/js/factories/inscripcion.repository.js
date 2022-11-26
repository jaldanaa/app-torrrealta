(function () {
    'use strict';

    angular.module('UniversidadApp')
        .factory('InscripcionRepository', InscripcionRepository);

        InscripcionRepository.$inject = ['$http', '$q', 'apiUrl', 'AuthenticationService'];

    function InscripcionRepository($http, $q, apiUrl, authenticationService) {
        var repository = {
            getAlumnos: getAlumnos,
            getRepresentantes: getRepresentantes,
            guardarRepresentante: guardarRepresentante,
            guardarAlumnos:guardarAlumnos,
            getAlumnosGrado:getAlumnosGrado,
            guardarNota:guardarNota
        };

        return repository;

        function getAlumnos() {
            return $http({
                method: 'GET',
                url: apiUrl + 'alumnos/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function error(response) {
            return $q.reject(response);
        }

        function getRepresentantes() {
            return $http({
                method: 'GET',
                url: apiUrl + 'representantes/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function guardarRepresentante(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'representantes/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function guardarAlumnos(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'alumnos/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function guardarNota(data) {
            console.log(data);
            return $http({
                method: 'POST',
                url: apiUrl + 'notas/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getAlumnosGrado(gradoId, ciclo) {
            var url1 = apiUrl + 'alumnos?';
            gradoId ? url1 += '&grado_id=' + gradoId : '';  
            ciclo ? url1 += '&v_ciclo=' + ciclo : '';         
            return $http({
                method: 'GET',
                url: url1,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

    }

})();