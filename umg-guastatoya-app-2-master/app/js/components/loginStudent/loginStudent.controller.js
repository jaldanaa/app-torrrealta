(function () {
    'use strict';

    angular.module('UniversidadApp')
        .controller('loginController', loginController)
        .component('loginStudent', {
            templateUrl: [function () {
                return 'js/components/loginStudent/loginStudent.html';
            }],
            controller: 'loginController',
            controllerAs: 'vm', //View Model
            bindings: {}
        });
    
    loginController.$inject = ['AuthenticationService', '$state'];

    function loginController(authenticationService, $state) {
        var vm = this;
        vm.$onInit = onInit;

        function onInit() {
            verifySession();
            vm.noticias = [];
            vm.loginFunction = loginStudent;
            vm.credenciales = {
                username: '',
                password: ''
            }
            vm.failedLogin = false;
            vm.accessDenied = false;
        }

        // Funcion que valida si el usuario tiene una sesion valida, en ese caso se redirige al inicio para evitar mostrar el login estando logueado
        function verifySession() {
            if (authenticationService.validSession()) {
                $state.go('evaluaciones', {});
            }
        }

        function loginStudent() {
            vm.failedLogin = false;
            vm.accessDenied = false;
            // verificacion del formulario
            if (vm.loginForm.$invalid) {
                return;
            }
            authenticationService.getToken(vm.credenciales).then(function (response) {
                console.log('respuesta '+response.status);
                if (response.status === 200) { // Si es un usario valido y tiene acceso al modulo, se redirige a la seccion de noticias
                    $state.go('evaluaciones', {}); 
                    vm.failedLogin = true; // Si las credenciales no pertenecen a ningun usuario
                }
            }).catch(function (error) {
                vm.failedLogin = true;
            });
        }
    }

})();