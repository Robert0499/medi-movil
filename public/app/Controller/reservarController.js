angular
  .module('mediMovil')
  .controller('reservarController', reservarController);
reservarController.$inject = [
  '$scope',
  'host',
  '$state',
  'reservarService',
  '$sessionStorage',
  'img'
];
function reservarController(
  $scope,
  host,
  $state,
  reservarService,
  $sessionStorage,
  img
) {
  if (
    typeof $sessionStorage.usuario !== 'undefined' &&
    $sessionStorage.usuario.datos.rol == '2'
  ) {
    $scope.reserva = id => {
      $('#reserva').modal('show');
      // console.log(id);
      $scope.reservar = () => {
        var fecha_actual = new Date();
        var fecha_usuario = $scope.user.fecha;
        var tmp = fecha_usuario - fecha_actual;
        if (tmp < 0) {
          toastr.info('Ingresó una fecha menor a la actual!');
        } else {
          $scope.user.id_medico = id;
          $scope.user.id_paciente = $sessionStorage.usuario.datos.id;
          reservarService
            .addReserva($scope.user)
            .then(result => {
              toastr.success(result.data.message);
            })
            .catch(err => {
              console.log(err.data);
              toastr.error(err.data);
            });
        }
      };
    };

    reservarService
      .getHorario()
      .then(result => {
        $scope.array = result.data;
      })
      .catch(err => {
        console.log(err);
      });
    reservarService
      .getMedicos()
      .then(result => {
        result.data.forEach(e => {
          e.foto = img + e.foto;
        });
        $scope.medico = result.data;
      })
      .catch(err => {
        console.log(err.data);
      });
    // filtrar por precio
    $scope.precio = () => {
        reservarService
          .getMedicos()
          .then(result => {
            result.data.forEach(e => {
              e.foto = img + e.foto;
            });
            $scope.medico = result.data;
            $scope.precio();
          })
          .catch(err => {
            console.log(err.data);
          });
        if ($scope.minimo == null && $scope.maximo == null) {
          reservarService
            .getMedicos()
            .then(result => {
              result.data.forEach(e => {
                e.foto = img + e.foto;
              });
              $scope.medico = result.data;
            })
            .catch(err => {
              console.log(err.data);
            });
        } else if ($scope.minimo == null) {
          console.log('minimo');
        } else if ($scope.maximo == null) {
          console.log('maximo');
        } else {
          $scope.medico.forEach(e => {
            if (e.precio >= $scope.minimo && e.precio <= $scope.maximo) {
              $scope.medico = [e];
              console.log($scope.medico);
            } else {
              $scope.medico = null;
            }
          });
        }
      }
    };
    // fin filtrar por precio
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
  } else {
    $state.go('inicio');
  }
}
