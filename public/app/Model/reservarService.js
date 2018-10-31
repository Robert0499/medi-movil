angular.module('mediMovil').service('reservarService', reservarService);
reservarService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function reservarService($http, host, $httpParamSerializerJQLike) {
  this.getHorario = () => {
    return $http.get(host + 'horario');
  };
  this.getMedicos = () => {
    return $http.get(host + 'medico');
  };
  this.addReserva = data => {
    return $http.post(host + 'cita', $httpParamSerializerJQLike(data));
  };
}
