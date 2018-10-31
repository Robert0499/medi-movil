angular
  .module('mediMovil')
  .controller('registroController', registroController);
registroController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  'registroService',
  'Upload',
  '$templateCache'
];
function registroController(
  $scope,
  $state,
  host,
  $sessionStorage,
  registroService,
  Upload,
  $templateCache
) {
  $templateCache.removeAll();
  $scope.return = () => {
    $state.go('inicio');
  };
  $('#iconF').click(function() {
    $('input[name=fileme]').trigger('click');
  });
  $('#icon2').click(function() {
    $('input[name=file]').trigger('click');
  });
  registroService
    .getTipoDocumento()
    .then(result => {
      console.log(result);
      $scope.tpd = result.data;
    })
    .catch(err => {
      console.log(err);
    });
  $scope.registroMedico = () => {
    if ($scope.contrasena === $scope.ccontrasena) {
      Upload.upload({
        url: host + 'medico',
        data: {
          foto: $scope.foto,
          nombre: $scope.nombre,
          tipo_id: $scope.tipo_id,
          numero_documento: $scope.numero_documento,
          telefono: $scope.telefono,
          correo: $scope.correo,
          precio: $scope.precio,
          descripcion: $scope.descripcion,
          usuario: $scope.usuario,
          contrasena: $scope.contrasena
        },
        headers: { 'Content-Type': 'application/json' }
      }).then(
        function(resp) {
          toastr.success(resp.data.message);
          $('#form1')[0].reset();
          $state.go('inicio');
        },
        function(resp) {
          toastr.error(resp.data.message);
        }
      );
    } else {
      $('#mensaje2').show();
    }
  };
  $scope.registroPaciente = () => {
    if ($scope.contrasena === $scope.ccontrasena) {
      Upload.upload({
        url: host + 'paciente',
        data: {
          foto: $scope.foto,
          nombre: $scope.nombre,
          tipo_id: $scope.tipo_id,
          numero_documento: $scope.numero_documento,
          telefono: $scope.telefono,
          correo: $scope.correo,
          usuario: $scope.usuario,
          contrasena: $scope.contrasena
        },
        headers: { 'Content-Type': 'application/json' }
      }).then(
        function(resp) {
          toastr.success(resp.data.message);
          $('#form2')[0].reset();
          $state.go('inicio');
        },
        function(resp) {
          toastr.error(resp.data.message);
        }
      );
    } else {
      $('#mensaje').show();
    }
  };
  $('#mensaje').hide();
  $('#mensaje2').hide();
  $('#rmedico').hide();
  $('#rpaciente').hide();
  $('#medico').hide();
  $('#paciente').hide();
  $scope.paciente = () => {
    $('#paciente').show();
    $('#rpaciente').show();
    $('#medico').hide();
    $('#rmedico').hide();
  };
  $scope.medico = () => {
    $('#medico').show();
    $('#rmedico').show();
    $('#paciente').hide();
    $('#rpaciente').hide();
  };
}
