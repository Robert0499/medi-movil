angular.module('mediMovil').service('medicoService', medicoService);
medicoService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function medicoService($http, host, $httpParamSerializerJQLike) {
  this.cambio = data => {
    return $http({ method: 'PUT', url: host + 'amedico', params: data });
  };
  this.getMedico = () => {
    return $http.get(host + 'medico');
  };
  this.getCitas = (id, rol) => {
    return $http({
      method: 'GET',
      url: host + 'cita',
      params: { fecha: new Date(), id: id, rol: rol }
    });
  };
  this.estado = data => {
    return $http({ method: 'PUT', url: host + 'adate', params: data });
  };
}
