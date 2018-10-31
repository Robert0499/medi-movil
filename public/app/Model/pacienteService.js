angular.module('mediMovil').service('pacienteService', pacienteService);
pacienteService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function pacienteService($http, host, $httpParamSerializerJQLike) {
  this.getMedicos = () => {
    return $http.get(host + 'medico');
  };
}
