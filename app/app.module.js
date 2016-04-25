angular.module('app', [
    'templates',
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'twentyone'
  ])
  .config(function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/twentyone');
  })
  .run(function () {

  });
