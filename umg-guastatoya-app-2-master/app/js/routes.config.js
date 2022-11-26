(function () {
    'use strict';

    angular.module('UniversidadApp')
        .config(config)
        .run(transitions);

    transitions.$inject = ['$transitions', '$state', '$window', 'ValidationsService', 'AuthenticationService'];

    function transitions($transitions, $state, $window, validationsService, authenticationService) {
        var targetState = {
            to: function (state) {
                    return state.name === 'evaluaciones'
                    || state.name === 'evaluacionResolver'
                    || state.name === 'evaluacionesResueltas'
                    || state.name === 'evaluacionResuelta'
                    || state.name === 'evaluacionResolver'
                    || state.name === 'evaluacion'
                    || state.name === 'noticia' 
                    || state.name === 'usuarios'
                    || state.name === 'usuario'
                    || state.name === 'grados';
            }
        }

        $transitions.onStart(targetState, function(transition) {
            // If the user is logged in
            var targetState = transition._targetState._identifier;
            if (typeof(targetState) === "object") {
                targetState = targetState.name;
            }
            if (authenticationService.validSession()) {
                authenticationService.refreshSession().then(function(response) {
                    var allowAccess = authenticationService.verifyPermission(targetState, response.user.profile.tipo);
                    if (!allowAccess) {
                        $state.go('noticias', {});
                    }
                });
            } else {
                authenticationService.logout();
                return;
            }
        });

    }
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    function config($stateProvider, $urlRouterProvider) {
        var states = [];

        states.push({
            name: 'noticias',
            url: '/',
            component: 'noticias'
        });

        states.push({
            name: 'usuarios',
            url: '/usuarios',
            component: 'usuarios',
            resolve: {
                usuarios: function (UsuariosService) {
                    return UsuariosService.getUsuarios();
                }
            }
        });

        states.push({
            name: 'grados',
            url: '/grados',
            component: 'grados',
            resolve: {
                grados: function (GradosService) {
                    return GradosService.getGrados();
                }
            }
        });

        states.push({
            name: 'grado',
            url: '/grados/:id',
            component: 'gradoForm',
            params: {
                id: {type: 'int', value: null}
            }
        });

        states.push({
            name: 'alumnos',
            url: '/alumnos',
            component: 'alumnos',
            resolve: {
                alumnos: function (InscripcionService) {
                    return InscripcionService.getAlumnos();
                }
            }
        });

        states.push({
            name: 'notas',
            url: '/notas',
            component: 'notas',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                grados: function (GradosService) {
                    return GradosService.getGrados();
                }
            }
        });

        states.push({
            name: 'nota',
            url: '/notas/:id/:alumno/:ciclo',
            component: 'notasForm',
            params: {
                id: {type: 'int', value: null},
                alumno: {type: 'int', value: null},
                ciclo: {type: 'int', value: null}
            },
            resolve: {
                cursos: function ($stateParams,GradosService) {
                    if ($stateParams.id) {
                        return GradosService.getCursos($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'inscripcion',
            url: '/alumnos/:id',
            component: 'inscripcionForm',
                params: {
                    id: {type: 'int', value: null}
                }
        });
        states.push({
            name: 'asignacion',
            url: '/alumnos/asignacionForm/:id',
            component: 'asignacionForm',
                params: {
                    id: {type: 'int', value: null}
                },
                resolve: {
                    grados: function(GradosService) {
                        return GradosService.getGrados();
                    }
                }
        });

        states.push({
            name: 'usuario',
            url: '/usuarios/:id',
            component: 'usuarioForm',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                usuario: function ($stateParams, UsuariosService) {
                    if ($stateParams.id) {
                        return UsuariosService.getUsuario($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'blog',
            url: '/blog',
            component: 'blog',
            params: {
                search: {type: 'string', value: ''},
                noticiaId: {type: 'int', value: null}
            }
        });

        states.push({
            name: 'nosotros',
            url: '/nosotros',
            component: 'nosotros'
        });

        states.push({
            name: 'noticia',
            url: '/noticia/:id',
            component: 'noticiaForm',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                noticia: function ($stateParams, NoticiasService) {
                    if ($stateParams.id) {
                        return NoticiasService.getNoticia($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'noticiaDetalle',
            url: '/noticia-detalle/:titulo/:id',
            component: 'noticiaDetalle',
            params: {
                id: {type: 'int', value: null},
                titulo: {type: 'string', value: null}
            },
            resolve: {
                noticia: function ($stateParams, NoticiasService) {
                    if ($stateParams.id) {
                        return NoticiasService.getNoticia($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'login',
            url: '/login',
            component: 'login'
        });

        states.push({
            name: 'loginStudent',
            url: '/loginStudent',
            component: 'loginStudent'
        });

        states.push({
            name: 'registro',
            url: '/registro',
            component: 'registro'
        });

        states.push({
            name: 'evaluaciones',
            url: '/evaluaciones',
            component: 'evaluaciones',
            resolve: {
                evaluaciones: function(EvaluacionesService) {
                    return EvaluacionesService.getEvaluaciones();
                }
            }
        });

        states.push({
            name: 'evaluacionesResueltas',
            url: '/evaluaciones-resueltas',
            component: 'evaluacionesResueltas',
            resolve: {
                evaluacionesResueltas: function(EvaluacionesService) {
                    return EvaluacionesService.getEvaluacionesResueltas();
                }
            }
        });

        states.push({
            name: 'evaluacion',
            url: '/evaluacion/:id',
            component: 'evaluacionForm',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                cursos: function(EvaluacionesService) {
                    return EvaluacionesService.getCursos();
                },
                evaluacion: function ($stateParams, EvaluacionesService) {
                    if ($stateParams.id) {
                        return EvaluacionesService.getEvaluacion($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'evaluacionResolver',
            url: '/evaluacion-resolver/:id',
            component: 'evaluacionResolver',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                evaluacion: function ($stateParams, EvaluacionesService) {
                    if ($stateParams.id) {
                        return EvaluacionesService.getEvaluacion($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'evaluacionResuelta',
            url: '/evaluacion-resuelta/:id',
            component: 'evaluacionResuelta',
            params: {
                id: {type: 'int', value: null}
            },
            resolve: {
                evaluacionResuelta: function ($stateParams, EvaluacionesService) {
                    if ($stateParams.id) {
                        return EvaluacionesService.getEvaluacionResuelta($stateParams.id);
                    }
                }
            }
        });

        states.push({
            name: 'notFound',
            url: 'pagina-no-encontrada/',
            component: 'notFound'
        })

        angular.forEach(states, function(state) {
            $stateProvider.state(state);
        });

        $urlRouterProvider.otherwise(function ($injector, $location) {
            var $state = $injector.get('$state');
            $state.go('notFound', {});
        });

    }

})();