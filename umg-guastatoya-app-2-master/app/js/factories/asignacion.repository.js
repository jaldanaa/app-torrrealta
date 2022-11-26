(function () {
    'use strict';

    angular.module('UniversidadApp')
        .factory('asignacionRepository', asignacionRepository);

        asignacionRepository.$inject = ['$http', '$q', 'apiUrl', 'AuthenticationService'];

    function asignacionRepository($http, $q, apiUrl, authenticationService) {
        var repository = {
            guardarAsignacion: guardarAsignacion,
            getGrados: getGrados
        };

        return repository;

       

        function error(response) {
            return $q.reject(response);
        }

        function guardarAsignacion(data) {
            return $http({
                method: 'POST',
                url: apiUrl + 'asignaciones/',
                data: data,
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

        function getGrados() {
            return $http({
                method: 'GET',
                url: apiUrl + 'grado/grados/',
                headers: authenticationService.getHeaders()
            }).then(function (response) {
                return response;
            }).catch(error);
        }

    }

})();