var ACS = require('acs').ACS, logger = require('acs').logger;

function signup(req, res) {

	var data = {
		email : req.body.email,
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		password : req.body.pw,
		password_confirmation : req.body.pw_c
	};

	ACS.Users.create(data, function(e) {
		if (e.success) {
			req.session.flash = {
				msg : 'User created successfully!',
				r : 0
			};
			req.session.controller = 'signup';
			res.render('login', {
				layout : 'application',
				req : req
			});
		} else {
			req.session.flash = {
				msg : e.message,
				r : 0
			};
			req.session.controller = 'signup';
			res.render('signup', {
				layout : 'application',
				req : req
			});
		}
	}, req, res);
}