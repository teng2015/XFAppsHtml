//模块定义
var xfapp = angular.module('xfapp', ['ui.router']);

// 配置路由
xfapp.config(function($stateProvider, $urlRouterProvider) {  
    $urlRouterProvider.otherwise("/main");
    $stateProvider
		// 主页面
        .state('main', {
            url: "/main",
            templateUrl: "main.html",
			controller: "mainContr"
        })
		// 新闻
        .state('news', {
            url: "/news",
            templateUrl: "news.html",
			controller: "newsContr"
        })
		// 教练风采
        .state('teachers', {
            url: "/teachers",
            templateUrl: "teachers.html",
			controller: "teachersContr"
        })
		// 兴甫风采
        .state('xingfufengcai', {
            url: "/xingfufengcai",
            templateUrl: "xingfufengcai.html",
			controller: "xingfufengcaiContr"
        })
		// 在线报名
        .state('regist', {
            url: "/regist",
            templateUrl: "regist.html",
			controller: "registContr"
        });
});