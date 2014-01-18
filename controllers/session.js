var ACS = require('acs').ACS, logger = require('acs').logger;

function login(req, res) {
	ACS.Users.login({
		login : req.body.un,
		password : req.body.pw
	}, function(e) {
		if (e.success) {
			var user = e.users[0];

			if (user.first_name && user.last_name) {
				user.name = user.first_name + ' ' + user.last_name;
			} else {
				user.name = user.username;
			};

			req.session.flash = {
				msg : 'Hello ' + user.name + '. ',
				r : 0
			};
			req.session.user = user;

			res.redirect('/');

			logger.info('user logged in: ' + user.name);

		} else {
			req.session.flash = {
				msg : e.message,
				r : 0
			};
			res.redirect('/');

		};
	}, req, res);
}

function logout(req, res) {
	ACS.Users.logout(function(e) {
		delete req.session.user;
		req.session.flash = {
			msg : 'successfully logged out',
			r : 0
		};

		res.redirect('/');
	}, req, res);
}