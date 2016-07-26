define(
	['backbone', 'jquery', 'AppView'], 
	function(Backbone, $, AppView) {
		'use strict';

		var router, 
			appView,
			Router = Backbone.Router.extend({
				routes: {
					'app/(:appName)': 'showApp',
					'*default': 'showHome'
				},
				showApp: function(appName) {
					appName = appName || 'dialer';
					appView.loadApp(appName);
				},
				showHome: function() {
					router.navigate("app/dialer", {trigger: true, replace: true});
				}
			});

		return {
			router: router,
			appView: appView,
			run: function(appId) {
					
				router = new Router();
				appView = new AppView({el: '#' + appId})
				Backbone.history.start();
			},
			
			redirectTo: function(appName) {
				router.navigate(appName, {trigger: true, replace: true});
			}
		}
	}
);