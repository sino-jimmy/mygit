define(
	['marionette', 'jquery', 'underscore'], 
	function(Marionette, $, _) {
		'use strict';

		return function() {
			return new Marionette.ItemView({
				template: _.template('Text in Dialer IndexView')
			});
		}
	}
);