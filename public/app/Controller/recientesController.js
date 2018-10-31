angular
  .module('mediMovil')
  .controller('recientesController', recientesController);
recientesController.$inject = [
  '$scope',
  'host',
  '$state',
  'recientesService',
  '$sessionStorage',
  'img'
];
function recientesController(
  $scope,
  host,
  $state,
  recientesService,
  $sessionStorage,
  img
) {
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
    $scope.cancelar = id => {
      $('#cancelar').modal('show');
      $scope.cancelaC = () => {
        $scope.user.id_cita = id;
        recientesService
          .cancelarCita($scope.user)
          .then(result => {
            $('#cancelar').modal('hide');
            $('#formC')[0].$reset();
            recientesService
              .getRecientes()
              .then(result => {
                result.data.forEach(e => {
                  e.foto = img + e.foto;
                });
                $scope.medicos = result.data;
                // $sessionStorage.cita = result.data;
              })
              .catch(err => {
                console.log(err);
              });
            toastr.success(result.data.message);
          })
          .catch(err => {
            console.log(err);
            toastr.error(err.data);
          });
      };
    };
    recientesService
      .getRecientes($sessionStorage.usuario.datos.id, 'paciente')
      .then(result => {
        result.data.forEach(e => {
          e.foto = img + e.foto;
        });
        $scope.medicos = result.data;
        console.log(result);

        // $sessionStorage.cita = result.data;
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    $state.go('inicio');
  }
}
