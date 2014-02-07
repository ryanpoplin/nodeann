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
					// alert(user.get("email") + ' you have been logged in...');
					core_router.navigate('profile', {trigger: true});
					return this;
				},
				error: function(user, error) {
					alert('An error has occured...');
					return this;
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
					// alert('Thank you for signing up!');
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

	app.views.profile_view = Backbone.View.extend({
		el: '#parsebone',
		template: _.template($('#profile-template').html()),
		initialize: function() {
			console.log('profile_view init...');
		},
		events: {
			'click #log-out': 'log_out',
			'click #submit-post': 'submit_post'
		},	
		log_out: function() {
			Parse.User.logOut();
			core_router.navigate('', {trigger: true});
		},
		submit_post: function() {
			// event.preventDefault()
			var post_textarea, current_user, post_array, i;
			current_user = Parse.User.current();
			post_textarea = $('#post-textarea').val();
			/*if (post_textarea === '') {
				// alert('Type something in that post!');
			} else {*/
				current_user.add('post', post_textarea);
				current_user.save(null, {
					success: function() {
						console.log('...');
					},
					error: function() {
						alert('Error...');
					}
				});
			//}
			this.render();
			return this;
		},
		render: function() {
			var post_array, i;
			var current_user, username, email;
			current_user = Parse.User.current();
			this.$el.html(this.template());
			// alert(current_user.id);
			username = current_user.get('username');
			// alert(username);
			email = current_user.get('email');
			// alert(email);
			post_array = current_user.get('post');
			$('#user-heading').append('<span> Howdy, ' + username + '</span>');
			$('#user-data').append('<br>');
			$('#user-data').append('<span> email: ' + email + '</span>');
			if (post_array !== undefined) {	
				post_array.reverse();
				for (i = 0; i < post_array.length; i += 1) {	
					$('#post-area').append('<p>' + post_array[i] + '</p>');
				}
			} else {
				$('#post-area').append('<p>Add some posts...</p>');
			}
			// return this;
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