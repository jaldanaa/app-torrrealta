(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('registroController', registroController)
        .component('registro', {
            templateUrl: [function () {
                return 'js/components/registro/registro.html';
            }],
            controller: 'registroController',
            controllerAs: 'vm', //View Model
            bindings: {}
        });
    
    registroController.$inject = ['AuthenticationService', '$state', 'UsuariosService'];

    function registroController(authenticationService, $state, usuariosService) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            verifySession();
            setInitialModel();
            vm.crearEstudiante = crearEstudiante;
        }

        // Funcion que valida si el usuario tiene una sesion valida, en ese caso se redirige al inicio para evitar mostrar el login estando logueado
        function verifySession() {
            if (authenticationService.validSession()) {
                $state.go('evaluaciones', {});
            }
        }

        function setInitialModel () {
            vm.usuarioModel = {
                profile: {
                    tipo: 3,
                },
                last_login: '',
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                date_joined: ''
            }

        }

        function crearEstudiante() {
            vm.usuarioForm.$submitted = true;
            if (vm.usuarioForm.$invalid) {
                return;
            }
            // Al crear un usuario, se llama un servicio para estructurar el payload tal como lo requirere el endpoint sin incluir los campos extras que pertenecen al profile
            var newUserData = usuariosService.getUserData(vm.usuarioModel);

            // Se define el timestamp en que se crea el usuario
            newUserData.date_joined = moment().format('YYYY-MM-DDThh:mm:ss');
            newUserData.last_login = null; // ultima vez que se loguea es nulo ya que es usuario nuevo
            newUserData.password = vm.usuarioModel.profile.raw_password; // se hace una copia del password en el modelo profile para poder leerlo despues, ya que django por defecto lo hashea antes de guardarlo en base de datos
            usuariosService.crearEstudiante(newUserData).then(function (response) {
                if (response.status === 201) { // Primero se crea el usuario en el modelo User de django, a su vez este automaticamente le creara un profile con el mismo id del usuario recien creado
                    vm.usuarioModel.profile.id = response.data.id;
                    // Se hace una peticion para editar el perfil del nuevo usuario y sincronizar su data, que seria su tipo de usuario y su password
                    usuariosService.editarPerfilEstudiante(response.data.id, vm.usuarioModel.profile).then(function(response) { 
                        if (response.status === 200) {
                            alert('Usuario creado con exito');
                            $state.go('login', {});
                        }
                    });
                }
            }).catch(function(error) {
                console.log(error);
                alert('Error de servidor, intente mas tarde');
            });
        }

    }

})();