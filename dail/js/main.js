requirejs.config({
	//baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-1.11.3.min',
		text: 'vendor/text-requirejs',
		backbone: 'vendor/backbone',
		underscore: 'vendor/underscore',
		marionette: 'vendor/backbone.marionette.min'
		//abc: 'abc'
	}
});

require(['app'], function(app) {
	app.run('app');
}); 
