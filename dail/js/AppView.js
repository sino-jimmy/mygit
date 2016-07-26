define(['marionette', 'require'],
	function(Marionette, require) {
		'use strict';
		
		return Marionette.LayoutView.extend({
			regions: {
				subview: '#subview'
			},
			loadApp: function(appName) {
				var self = this;
				this.$('a.js-route.active').removeClass('active');
				this.$('a[href="#app/'+appName+'"]').addClass('active');
				
				require(
					['../' + appName + '/IndexView'], 
					function(ViewGen) {
						self.subview.show(ViewGen());
				}, function() {
					self.$('#subview').load(appName + '/index.html');
				});
			}
		});
	}
);