angular.module('mediMovil').service('perfilService', perfilService);
perfilService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function perfilService($http, host, $httpParamSerializerJQLike) {
  this.updatePaciente = data => {
    return $http({ method: 'PUT', url: host + 'apaciente', params: data });
  };
}
