define(
	['marionette', 'backbone', 'jquery', 'underscore', 'text!./html/index.html', 'require'], 
	function(Marionette, Backbone, $, _, html, require) {
		'use strict';

		var ContactModel = Backbone.Model.extend({
			defaults: {
				number: 'unknown',
				name: 'unknown',
				id: 0
			}
		});

		var ContactCollection = Backbone.Collection.extend({
			model: ContactModel,

			//url: require.toUrl('./data.json')
		});

		var ContactView = Marionette.ItemView.extend({
			initialize: function() {
				this.listenTo(this.collection, 'add', this.render);
				this.listenTo(this.collection, 'remove', this.render);
				this.listenTo(this.collection, 'reset', this.render);
				this.listenTo(this.collection, 'change', this.render);
			},

			template: _.template(html),
			className:"mdview js-mdview",
			events: {
				'click .js-edit': 'editContact',
				'click .js-back': 'showMaster',
				'click .js-add': 'addContact',
				'click .js-remove': 'removeContact',
				'click .js-save': 'saveContact'
			},

			serializeData: function() {
				var data = this.collection.toJSON();
				return {items: data};
			},
			editContact: function(evt) {
				var id = $(evt.currentTarget).parent().data('id');
				var model = this.collection.get(id);

				this.$('#edit_name').val(model.get('name'));
				this.$('#edit_number').val(model.get('number'));

				this.editModel = model;

				this.$el.addClass('detail');
			},
			showMaster: function() {
				console.log(this.el);				
				$(this.el).removeClass('detail');
			},
			onRender: function() {
				//alert('renderred');
			},
			onDestroy: function() {
				//alert('destroy');
			},
			addContact: function() {
				var id = _.uniqueId();
				var model = new ContactModel({
					name: 'user_name_' + id,
					number: ((Math.random()*1E11) % 1E11).toFixed(),
					id: 'id_' + id
				});
				this.collection.add(model);
			},
			removeContact: function(evt) {
				evt.stopPropagation();
				//evt.preventDefault();

				var id = $(evt.currentTarget).parent().data('id');
				this.collection.remove(id)
			},
			saveContact: function() {
				var name = this.$('#edit_name').val();
				var number = this.$('#edit_number').val();

				var model = this.editModel;
				model.set({
					name: name,
					number: number
				});
				

				var self=this;
				_.defer(function() {
					self.showMaster();
				});
			}
		});

		return function() {
			var collection = new ContactCollection();
			collection.add(new ContactModel({name: 'Jim', number: 4399,id:101}));
			collection.add(new ContactModel({name: 'Jim1', number: 4499,id:102}));
			collection.add(new ContactModel({name: 'Jim2', number: 4599,id:103}));
			//collection.add({})
			return new ContactView({collection: collection});
		};
	}
);