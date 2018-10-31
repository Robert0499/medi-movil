angular.module('mediMovil').service('inicioService', inicioService);
inicioService.$inject = ['$http', 'host', '$httpParamSerializerJQLike'];
function inicioService($http, host, $httpParamSerializerJQLike) {
  this.login = data => {
    return $http.post(host + 'auth', $httpParamSerializerJQLike(data));
  };
}
