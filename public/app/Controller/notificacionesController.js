angular
  .module('mediMovil')
  .controller('notificacionesController', notificacionesController);
notificacionesController.$inject = ['$scope', '$state', 'host'];
function notificacionesController($scope, $state, host) {
  if (
    typeof $sessionStorage.usuario !== 'undefined' &&
    $sessionStorage.usuario.datos.rol == '2'
  ) {
    $scope.cerrar = () => {
      $sessionStorage.$reset();
      $state.go('inicio');
    };
    $scope.recientes = () => {
      $state.go('recientes');
    };
    $scope.notifi = () => {
      $state.go('notificaciones');
    };
    $scope.perfil = () => {
      $state.go('perfil');
    };
    $scope.reservar = () => {
      $state.go('reservar');
    };
    $scope.chat = () => {
      $state.go('paciente');
    };

    $scope.open = () => {
      $('#calificar').modal('show');
    };
  } else {
    $state.go('inicio');
  }
}
