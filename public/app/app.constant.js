angular.module('mediMovil').constant('state', (stateprovider, name) => {
  stateprovider.state(name, {
    url: '/' + name,
    controller: name + 'Controller',
    templateUrl: 'app/View/' + name + '.html',
    resolve: {
      loadMyCtrl: [
        '$ocLazyLoad',
        $ocLazyLoad => {
          return $ocLazyLoad.load([
            {
              files: [
                'app/Controller/' + name + 'Controller.js',
                'app/Css/' + name + 'Style.css',
                'app/Model/' + name + 'Service.js'
              ]
            }
          ]);
        }
      ]
    }
  });
});
angular
  .module('mediMovil')
  .constant('host', 'http://192.168.0.101/medi-movil/public/api/');
angular
  .module('mediMovil')
  .constant('img', 'http://192.168.0.101/medi-movil/files/');
