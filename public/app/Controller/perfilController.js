angular.module('mediMovil').controller('perfilController', perfilController);
perfilController.$inject = [
  '$scope',
  '$state',
  'host',
  'Upload',
  '$sessionStorage',
  'perfilService',
  'img'
];
function perfilController(
  $scope,
  $state,
  host,
  Upload,
  $sessionStorage,
  perfilService,
  img
) {
  if (
    typeof $sessionStorage.usuario !== 'undefined' &&
    $sessionStorage.usuario.datos.rol == '2'
  ) {
    $('#iconF').click(function() {
      $('input[name=fotome]').trigger('click');
    });
    $('#mensaje').hide();

    $('#iconF').click(function() {
      $('input[name=fileme]').trigger('click');
    });
    $('#icon2').click(function() {
      $('input[name=file]').trigger('click');
    });
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

    $scope.cambio = () => {
      Upload.upload({
        url: host + 'img',
        data: {
          foto: $scope.foto_user,
          id: $sessionStorage.usuario.datos.id
        },
        headers: { 'Content-Type': 'application/json' }
      }).then(
        function(resp) {
          $scope.foto_user = img + resp.data.datos.foto + '?' + Date.now();
          $sessionStorage.usuario.datos.foto = resp.data.foto;
          toastr.success(resp.data.message);
        },
        function(resp) {
          toastr.error(resp.data.message);
          console.log(resp.data);
        }
      );
    };
    $scope.user = [];
    $scope.user.id = $sessionStorage.usuario.datos.id;
    $scope.foto_user = img + $sessionStorage.usuario.datos.foto;
    $scope.user.nombre = $sessionStorage.usuario.datos.nombre;
    $scope.user.correo = $sessionStorage.usuario.datos.correo;
    $scope.user.telefono = parseInt($sessionStorage.usuario.datos.telefono);
    $scope.updateP = () => {
      perfilService
        .updatePaciente($scope.user)
        .then(result => {
          toastr.success(result.data.message);
        })
        .catch(err => {
          toastr.error(err.data);
        });
    };

    // console.log($scope.user);
  } else {
    $state.go('inicio');
  }
}
