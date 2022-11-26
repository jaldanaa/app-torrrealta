(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('AsignacionService', AsignacionService);
    
        AsignacionService.$inject = ['asignacionRepository', '$filter', '$state'];

    function AsignacionService(asignacionRepository, $filter, $state) {
        var service = this;

        var service = {
            guardarAsignacion: guardarAsignacion,
            getGrados,
            asignacion: []
        };

        return service;

        function guardarAsignacion(asignacionModel) {
            return asignacionRepository.guardarAsignacion(asignacionModel).then(function(response) {
                return response;
            }).catch(function(error) {
                return error;
            });
        }

        function getGrados() {
            return GradosRepository.getGrados().then(function(response) {
                service.grados = response.data;
                return service.grados;
            }).catch(handleError);
        }
    }

})();