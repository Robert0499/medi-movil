angular.module('mediMovil').service('registroService', registroService);
registroService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function registroService($http, host, $httpParamSerializerJQLike) {
  this.getTipoDocumento = () => {
    return $http.get(host + 'tpd');
  };
  this.registro = data => {
    return $http.post(host + 'medico', $httpParamSerializerJQLike(data));
  };
}
