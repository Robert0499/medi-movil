angular.module('mediMovil').controller('medicoController', medicoController);
medicoController.$inject = [
  '$scope',
  'host',
  '$state',
  'medicoService',
  '$sessionStorage',
  'img',
  'Upload'
];
function medicoController(
  $scope,
  host,
  $state,
  medicoService,
  $sessionStorage,
  img,
  Upload
) {
  if (
    typeof $sessionStorage.usuario != 'undefined' &&
    $sessionStorage.usuario.datos.rol == '1'
  ) {
    $scope.reportes = () => {
      $state.go('reportes');
    };
    let rol = 'medico';
    let id = $sessionStorage.usuario.datos.id;
    medicoService
      .getCitas(id, rol)
      .then(result => {
        $scope.array1 = result.data;
        console.log($scope.array1);
      })
      .catch(err => {
        console.log(err);
      });
    $('#iconF').click(function() {
      $('input[name=fotome]').trigger('click');
    });
    $scope.fecha = new Date();
    $scope.cerrar = () => {
      $sessionStorage.$reset();
      $state.go('inicio');
    };
    $scope.cambioFoto = () => {
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
          console.log(resp.data);
        },
        function(resp) {
          toastr.error(resp.data.message);
          console.log(resp);
        }
      );
    };
    $scope.cambio = () => {
      $scope.medico.id = $sessionStorage.usuario.datos.id;
      medicoService
        .cambio($scope.medico)
        .then(result => {
          toastr.success(result.data.message);
        })
        .catch(err => {
          toastr.error(err.data.message);
        });
    };
    $scope.cancelar = () => {
      $('#cancelar').modal('show');
    };
    $scope.aceptar = () => {
      toastr.success('Se registro la cita');
    };
    $scope.perfil = () => {
      medicoService
        .getMedico()
        .then(result => {
          $scope.infoMedico = result.data[$sessionStorage.usuario.datos.id - 1];
          console.log($scope.infoMedico);
          $scope.medico = [];
          $scope.foto_user = img + $scope.infoMedico.foto;
          $scope.medico.correo = $scope.infoMedico.correo;
          $scope.medico.telefono = parseInt($scope.infoMedico.telefono);
          $scope.medico.descripcion = $scope.infoMedico.descripcion;
          $scope.medico.precio = parseInt($scope.infoMedico.precio);
        })
        .catch(err => {});
      $('#perfil').modal('show');
    };
    $scope.usuario = () => {
      $('#usuario').modal('show');
    };
    $scope.aceptar = id => {
      $scope.estado = [];
      $scope.estado.id = id;
      $scope.estado.estado = 'finalizado';
      medicoService
        .estado($scope.estado)
        .then(result => {
          toastr.success(result.data.message);
          medicoService
            .getCitas(id, rol)
            .then(result => {
              $scope.array1 = result.data;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          toastr.error(err.data.message);
        });
    };
    $scope.cancelar = id => {
      $scope.estado = [];
      $scope.estado.id = id;
      $scope.estado.estado = 'cancelado';
      $('#observacion').modal('show');
      $scope.observacion = () => {
        $scope.estado.observacion = $scope.obser;
        console.log($scope.estado);
        medicoService
          .estado($scope.estado)
          .then(result => {
            toastr.success(result.data.message);
            medicoService
              .getCitas(id, rol)
              .then(result => {
                $scope.array1 = result.data;
              })
              .catch(err => {});
            $('#form1')[0].reset();
            $('#observacion').modal('hide');
          })
          .catch(err => {
            console.log(err);
            toastr.error(err.data.message);
          });
      };
    };
  } else {
    $state.go('inicio');
  }
}
