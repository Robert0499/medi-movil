angular.module('mediMovil').service('recientesService', recientesService);
recientesService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function recientesService($http, host, $httpParamSerializerJQLike) {
  this.getRecientes = (id, rol) => {
    return $http({
      method: 'GET',
      url: host + 'cita',
      params: { fecha: new Date(), id: id, rol: rol }
    });
  };

  this.getEstados = () => {
    return $http.get(host + '');
  };

  this.cancelarCita = data => {
    return $http.post(host + 'cancelar', $httpParamSerializerJQLike(data));
  };
}
