angular
  .module('mediMovil')
  .controller('reportesController', reportesController);
reportesController.$inject = [
  '$scope',
  '$state',
  'host',
  '$sessionStorage',
  '$localStorage'
];
function reportesController(
  $scope,
  $state,
  host,
  $sessionStorage,
  $localStorage
) {
  if (
    typeof $sessionStorage.usuario !== 'undefined' &&
    $sessionStorage.usuario.datos.rol == '1'
  ) {
    $inas = $localStorage.reportes;
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
        ],
        datasets: [
          {
            label: '# Total Ingresos',
            data: [20, 10, 8, 6, 4, 2, 15, 10, 8, 7, 15, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(23, 204, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(23, 204, 64, 12)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    $scope.cerrar = () => {
      $sessionStorage.$reset();
      $state.go('inicio');
    };
    $scope.medico = () => {
      $state.go('medico');
    };
  } else {
    $state.go('inicio');
  }
}
