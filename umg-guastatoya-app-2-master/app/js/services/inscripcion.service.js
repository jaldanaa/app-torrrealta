(function () {
    'use strict';
    angular.module('UniversidadApp')
        .service('InscripcionService', InscripcionService);
    
        InscripcionService.$inject = ['InscripcionRepository', '$filter', '$state'];

    function InscripcionService(InscripcionRepository, $filter, $state) {
        var service = this;

        var service = {
            getAlumnos: getAlumnos,
            getRepresentantes: getRepresentantes,
            guardarInscripcion: guardarInscripcion,
            getAlumnosGrado: getAlumnosGrado,
            guardarNota:guardarNota,
            representantes: [],
            alumnos: []
        };

        return service;


        // Devuelve todos los usuarios
        function getAlumnos() {
            return InscripcionRepository.getAlumnos().then(function(response) {
                service.alumnos = response.data;
                return service.alumnos;
            }).catch(handleError);
        }

        function getRepresentantes() {
            return InscripcionRepository.getRepresentantes().then(function(response) {
                service.representantes = response.data;
                return service.representantes;
            }).catch(handleError);
        }

        // Funcion que se usa para manejar los errores de los endpoints de usuarios, si devuelve 403 (forbidden) significa que no tiene acceso al endpoint y se redirige al inicio
        function handleError(error) {
            if (error.status === 403) {
                $state.go('inscripciones', {});
            }
            return error;
        }

        function guardarInscripcion(RepresentanteModel, alumnoModel) {
            return InscripcionRepository.guardarRepresentante(RepresentanteModel).then(function(response) {
                if(response.status===201){
                    console.log('entro a la condicion');
                    alumnoModel.padre_representantes = response.data.id;
                    console.log(alumnoModel);
                    return InscripcionRepository.guardarAlumnos(alumnoModel).then(function(responseAlumn) {
                        return responseAlumn;
                    }).catch(function(error) {
                        return error;
                    });
                }else{
                    return response;
                }                
            }).catch(function(error) {
                return error;
            });
        }

        function getAlumnosGrado(gradoId, ciclo) {
            return InscripcionRepository.getAlumnosGrado(gradoId, ciclo).then(function (response) {
                service.alumnos = response.data;
                console.log(response);
                return service.alumnos; 
            }).catch(function (error) {
                return error;
            })
        }

        function guardarNota(notaModel) {
            return InscripcionRepository.guardarNota(notaModel).then(function(response) {
                return response;               
            }).catch(function(error) {
                return error;
            });
        }
    }

})();