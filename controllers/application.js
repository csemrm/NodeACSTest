var ACS = require('acs').ACS, logger = require('acs').logger;

function index(req, res) {
	req.session.controller = 'index';

	if (!req.session.user) {
		res.render('login', {
			layout : 'application',
			req : req
		});
	} else {
		var data = {

			per_page : 100,
			order : '-update_at',
			where : {
				user_id : req.session.user.id
			}
		};
		req.session.flash = {
			msg : 'Welcome to my application',
			r : 0
		};
		res.render('index', {
			layout : 'application',

			req : req,
		});

	}

}

function signup(req, res) {

	req.session.controller = 'signup';

	if (!req.session.user) {
		res.render('signup', {
			layout : 'application',
			req : req
		});
	} else {
		res.redirect('/');
	}
}

function login(req, res) {
	req.session.controller = 'login';

	if (!req.session.user) {
		res.render('login', {
			layout : 'application',
			req : req,
		});
	} else {
		res.redirect('/');
	}

}

function MyProfile(req, res) {
	req.session.controller = 'MyProfile';
	 
	
		res.render('myprofile', {
			layout : 'application',
			req : req,
		});
	

}

function page_not_found(req, res) {
	res.send("Page not found");
}