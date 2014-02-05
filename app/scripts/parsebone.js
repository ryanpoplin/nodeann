/**
* Full Stack User Interactions With Parse.com and Backbone.js...
*/

// Keys...
Parse.initialize("tbIOLEXYyQMlsiZvdHpwpfxM1TfYf2AWuaY1ClAP", "PPL1IkNWuasv3kNjPuEA66dxQO1ZjR15kY2b7Tjj");

(function($) {
	
	var app, user, router, core_router;

	app = {
		views: {},
		router: null
	};

	app.views.index_view = Backbone.View.extend({
		el: '#parsebone',
		template: _.template($('#index-template').html()),
		events: {
			'click #log-in': 'log_in_func'
		},
		log_in_func: function() {
			var username, password;
			username = $('#log-in-username').val();
			password = $('#log-in-password').val();
			Parse.User.logIn(username, password, {
				success: function(user) {
					alert(user.get("email") + ' you have been logged in...');
					core_router.navigate('profile', {trigger: true});
				},
				error: function(user, error) {
					alert('An error has occured...');
				}
			});
		},
		initialize: function() {
			console.log('index_view init...');
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	app.views.sign_up_view = Backbone.View.extend({
		el: '#parsebone',
		template: _.template($('#sign-up-template').html()),
		events: {
			'click #sign-up': 'sign_up_func'
		},
		sign_up_func: function() {
			var username, email, password, user;
			username = $('#sign-up-username').val();
			email = $('#sign-up-email').val();
			password = $('#sign-up-password').val();
			user = new Parse.User();
			user.set("username", username);
			user.set("email", email);
			user.set("password", password);
			user.signUp(null, {
				success: function(user) {
					alert('Thank you for signing up!');
					core_router.navigate('', {trigger: true});
					return this;
				},
				error: function(user, error) {
					alert("Error: " + error.code + " " + error.message);
					return this;
				}
			});
		},
		initialize: function() {
			console.log('sign_up_view init...');
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	// When the user is logged in, their specific data should show here...
	// Info: Username, Email, and Password...
	// They should be able to edit this information, cancel and save those changes...
	app.views.profile_view = Backbone.View.extend({
		el: '#parsebone',
		template: _.template($('#profile-template').html()),
		initialize: function() {
			console.log('profile_view init...');
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	app.router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'sign-up': 'sign_up',
			'profile': 'profile'
		},
		initialize: function() {
			console.log('app.router init...');
		},
		index: function() {
			var index_view;
			index_view = new app.views.index_view();
			index_view.render();
		},
		sign_up: function() {
			var sign_up_view;
			sign_up_view = new app.views.sign_up_view();
			sign_up_view.render();
		},
		profile: function() {
			var profile_view;
			profile_view = new app.views.profile_view();
			profile_view.render();
		}
	});

	core_router = new app.router();

	Backbone.history.start();

	/**
	*
	* I've got users signing up and logging in with the above code...
	* Below I have the 'Parse' code for logging a user out, saving user data, 
	* keeping the user logged in, 
	*
	*/

	/*
		// keep a user logged in...
		var loggedInUser = Parse.User.current();
		if(!loggedInUser) {
			//off you go, perform a log in
		} else {
			console.log(loggedInUser.get("email"));
		}	
	
	*/

})(jQuery);