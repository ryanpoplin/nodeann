/**
* Full Stack User Interactions With Parse.com and Backbone.js...
*/

// Keys...
Parse.initialize("tbIOLEXYyQMlsiZvdHpwpfxM1TfYf2AWuaY1ClAP", "PPL1IkNWuasv3kNjPuEA66dxQO1ZjR15kY2b7Tjj");

(function($) {

	// Users .signUp() and the just make updates with .save(), etc...
	
	var app, user, router, core_router;

	app = {
		views: {},
		router: null
	};

	// As basic as the below code is, I'm getting these errors when users sign in...
	// Logging in gives the same error...
	// The error for both functions: Signing and logging the user up multiple times 
	// in a row...

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
		events: {
			'click #log-out': 'log_out'
		},	
		log_out: function() {
			alert('You\'ve logged out ya bastard!');
			Parse.User.logOut();
			core_router.navigate('', {trigger: true});
		},
		render: function() {
			var current_user, user_query, current_user_username;
			this.$el.html(this.template());
			current_user = Parse.User.current();
			console.log(current_user);
			console.log(current_user.id);
			user_query = new Parse.Query(Parse.User);
			user_query.get(current_user.id, {
				success: function(something) {
					var username, email;
					console.log('Data retrieved for the current user...');
					username = current_user.get('username');
					console.log(username);
					email = current_user.get('email');
					console.log(email);
					$('#user-data').append('<span>' + username + '</span>');
					$('#user-data').append('<br>');
					$('#user-data').append('<span>' + email + '</span>');
				},
				error: function(object, error) {
					console.log('You are a dumbass...');
				}
			});
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
	* keeping the user logged in, and retrieving data...
	*
	* I understand that I am to translate this code into proper CoffeScript syntax
	* plus its language features with Brunch's advanced Marionette scaffold. 
	* However, I'm having problems understanding where the below
	* code is supposed to fit into the application even as a pure Backbone app...
	*
	* If you guys could help guide me in the right direction, it would be most awesome!
	* 
	*/

	/*
		
		// check if a user is logged in...
		
		var loggedInUser;
		loggedInUser = Parse.User.current();
		if(!loggedInUser) {
			// Need to perform the log in...
		} else {
			console.log(loggedInUser.get("email"));
		}	

		// save user's data...
		
		var user, Pro_Lang, pro_lang_one, pro_lang_two;
		user = Parse.User.current();
		Pro_Lang = Parse.Object.extend('Best Programming Language');
		
		pro_lang_one = new Pro_Lang({'name':'JavaScript','user':user});
		pro_lang_one.save();
		 
		pro_lang_two = new Pro_Lang({'name':'C++',"user":user});
		pro_lang_two.save();

		// retrieve user's data... 
		
		var Pro_Lang, q, i, lang;
		Pro_Lang = Parse.Object.extend("Best Programming Language");
		q = new Parse.Query(Pro_Lang);
		q.equalTo('user', user);
		q.find({
			success: function(results){
				for (i in results){	
					lang = results[i];
					console.log(lang.get('name'));
				}
			}
		});

		// log the current user out...

		Parse.User.logOut();

	*/

})(jQuery);

// Just Parse.com JS Docs Testing...

(function($) {

	var User_Score, 
		user_one_score,
		User_Pro_Lang,
		Test_Data,
		test_data_one,
		test_query_one,
		test_query_two,
		player_name_one,
		player_name_two;
	
	User_Score = Parse.Object.extend('User_Score');
	user_one_score = new User_Score();

	User_Pro_Lang = Parse.Object.extend('User_Pro_Lang', {
		// Instance Methods...
		initialize: function() {
			console.log('User_Pro_Lang init...');
		}
	}, {
		// Class Methods...
	});

	user_pro_lang_one = new User_Pro_Lang();
	console.log(user_pro_lang_one);

	// Testing data save...
	// I'll be utilizing Test_Data and test_data_one for the rest of the examples...
	Test_Data = Parse.Object.extend('Test_Data');
	test_data_one = new Test_Data();
	
	test_data_one.set('score', 25);
	test_data_one.set('playerName', 'Poplinr');
	test_data_one.set('completed', false);

	/*test_data_one.save(null, {
		success: function(test_data_one) {
			console.log(test_data_one.id);
		},
		error: function(test_data_one, error) {
			console.log(error.description);
		}
	});*/

	test_query_one = new Parse.Query(Test_Data);
	test_query_one.get('3eaVjWhcvV', {
		success: function(test_data_one) {
			console.log('Data retrieved...');
		},
		error: function(object, error) {
			console.log('You are a dumbass...');
		}
	});

	player_name_one = test_data_one.get('playerName');
	console.log(player_name_one);

	test_data_two = new Test_Data();

	test_data_two.set('score', 35);
	test_data_two.set('playerName', 'Vredesbyrdann');
	test_data_two.set('completed', false);

	/*test_data_two.save(null, {
		success: function(test_data_two) {
			console.log(test_data_two.id);
		},
		error: function(test_data_two, error) {
			console.log(error.description);
		}
	});*/

	test_query_two = new Parse.Query(Test_Data);
	test_query_two.get('jjkdSfcp1c', {
		success: function(test_data_two) {
			console.log('Data retrieved...');
		},
		error: function(object, error) {
			console.log('You are a dumbass...');
		}
	});

	player_name_two = test_data_two.get('playerName');
	console.log(player_name_two);
	player_score_two = test_data_two.get('score');
	console.log(player_score_two);

	// Why refreshing?
	test_data_two.fetch({
		success: function(test_data_two) {
			console.log('test_data_two was refreshed!');
		},
		error: function(test_data_two, error) {
			console.log('You are a dumbass...')
		}
	});

	test_data_two.id = 'jjkdSfcp1c';
	
	test_data_two.set('score', 55);

	test_data_two.increment('score', 24);
	
	/*test_data_two.save(null, {
	  success: function(point) {
	    // Saved successfully.
	  },
	  error: function(point, error) {
	    // The save failed.
	    // error is a Parse.Error with an error code and description.
	  }
	});*/

	// Any extensive data array saves in Parse in general?

	test_data_three = new Test_Data();
	test_data_three.set('name', 'Yo Mama...');
	// test_data_three.save(null);
	test_query_three = new Parse.Query(Test_Data);
	test_query_three.get('GrcijOemXy', {
		success: function(test_data_two) {
			console.log('Data retrieved...');
		},
		error: function(object, error) {
			console.log('You are a dumbass...');
		}
	});
	test_data_three.id = 'GrcijOemXy';
	/*test_data_three.destroy();*/
	// test_data_three.unset('name');
	// test_data_three.save();

})(jQuery);