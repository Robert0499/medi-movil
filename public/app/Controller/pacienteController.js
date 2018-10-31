angular
  .module('mediMovil')
  .controller('pacienteController', pacienteController);
pacienteController.$inject = [
  '$scope',
  'host',
  '$state',
  '$sessionStorage',
  'pacienteService'
];
function pacienteController(
  $scope,
  host,
  $state,
  $sessionStorage,
  pacienteService
) {
  $('#carBon').animate({ scrollTop: $('#carBon').height() }, 1000);
  if (
    typeof $sessionStorage.usuario != 'undefined' &&
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
    $scope.tmp = false;
    $scope.mensaje = () => {
      var mensaje = $scope.message.toLowerCase();
      if (mensaje.indexOf('cita') > 0) {
        $scope.tmp = true;
        // $scope.msg = mensaje;
        $('#carBon').append(
          "<div class='container d-flex justify-content-end'><div class= 'card col-sm-12 mb-2 p-0 w-50'><div class='card-header bg-success text-white'>Usuario:</div><div class='card-body'>" +
            mensaje +
            '</div></div ></div >'
        );
        $('#carBon').append(
          "<div class='container'><div class= 'card col-sm-12 mb-5 p-0 w-50'><div class='card-header bg-primary text-white'>Isis:</div><div class='card-body'>Veo que quieres una cita ¿Con que medico la quieres? <a id='medics'>O te puedo sugerir uno</a> </div></div></div>"
        );
      } else {
        alert('No te entendi');
      }

      var medics = document.getElementById('medics');
      medics.addEventListener('click', () => {
        pacienteService
          .getMedicos()
          .then(result => {
            var msj =
              "<div class='container'><div class='card col-sm-12 mb-5 p-0 w-50' id='medicos'><div class='card-header bg-primary text-white'> Isis:</div><div class='card-body'>";
            result.data.forEach(e => {
              msj += "<span class='medicos'>" + e.nombre + '</span> <br>';
            });
            msj += '</div></div></div>';
            $('#carBon').append(msj);
            $('#carBon').animate({ scrollTop: $('#carBon').height() }, 1000);
            var medicos = document.getElementsByClassName('medicos');
            for (let i = 0; i < medicos.length; i++) {
              medicos[i].addEventListener('click', e => {
                // console.log(medicos[i].innerHTML);
                $sessionStorage.nombreM = medicos[i].innerHTML;
                $('#carBon').append(
                  "<div class='container'><div class= 'card col-sm-12 mb-5 p-0 w-100'><div class='card-header bg-primary text-white'>Isis:</div><div class='card-body'>Escogiste a:  " +
                    medicos[i].innerHTML +
                    "<label>Selecciona una fecha: </label> <input class='form-control' type='date'></div></div></div>"
                );
              });
              $('#carBon').animate({ scrollTop: $('#carBon').height() }, 1000);
            }
          })
          .catch(err => {});
      });
      $('#carBon').animate({ scrollTop: $('#carBon').height() }, 1000);
      $scope.hola = id => {
        console.log(id);
      };
      /*     if({

      } */
      // if (message === 'Hola') {
      //   alert('Me dijiste hola!');
      // } else {
      //   alert('¡No te entiendo!');
      // }
      $('#formM')[0].reset();
    };
  } else {
    $state.go('inicio');
  }
}
