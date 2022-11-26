(function () {
    'use strict';

    angular.module('UniversidadApp')
        .factory('GradosRepository', GradosRepository);

    GradosRepository.$inject = ['$http', '$q', 'apiUrl', 'AuthenticationService'];

    function GradosRepository($http, $q, apiUrl, authenticationService) {
        var repository = {
            getGrados: getGrados,
            guardarGrado: guardarGrado,
            getCursos:getCursos,
            getNotasAlumno:getNotasAlumno
        };

        return repository;

        function getGrados() {
            return $http({
                method: 'GET',
                url: apiUrl + 'grado/grados/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function error(response) {
            return $q.reject(response);
        }

        function guardarGrado(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'grado/grados/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }
        function getCursos(gradoId) {
            var url1 = apiUrl + 'grado/cursos?';
            gradoId ? url1 += '&grado_id=' + gradoId : '';        
            return $http({
                method: 'GET',
                url: url1,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getNotasAlumno(alumnoId, ciclo) {
            var url1 = apiUrl + 'notas?';
            alumnoId ? url1 += '&alumno_id=' + alumnoId : '';  
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