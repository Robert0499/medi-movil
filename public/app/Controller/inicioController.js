angular.module('mediMovil').controller('inicioController', inicioController);
inicioController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  'inicioService'
];
function inicioController(
  $scope,
  $state,
  host,
  $sessionStorage,
  inicioService
) {
  if (typeof $sessionStorage.usuario == 'undefined') {
    $scope.registro = () => {
      $state.go('registro');
    };
    $scope.login = () => {
      inicioService
        .login($scope.user)
        .then(result => {
          $sessionStorage.usuario = result.data;
          if ($sessionStorage.usuario.datos.rol == '1') {
            $state.go('medico');
            toastr.success(result.data.message);
          } else if ($sessionStorage.usuario.datos.rol == '2') {
            $state.go('paciente');
            toastr.success(result.data.message);
          }
        })
        .catch(err => {
          console.log(err.data);
          toastr.error('Datos incorrectos');
        });
    };
  } else if ($sessionStorage.usuario.datos.rol == '1') {
    $state.go('medico');
  } else if ($sessionStorage.usuario.datos.rol == '2') {
    $state.go('paciente');
  }
}
