require('./configuration.js')
const middleware = require('../src/middleware.js');
const express = require('express');
const router = express.Router();

module.exports = function(){
	const app = express();

	app.set('port', process.env.PORT || 3000);

	app.use(express.static('public'));
	app.use(require('body-parser').urlencoded({
		extended: true,
		limit:'50mb'
	}));
	app.use(require('body-parser').json({
		limit: '50mb'
	}));
	app.use(require('cookie-parser')());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		if ('OPTIONS' === req.method) {
			res.sendStatus(200);
		}
		else {
			next();
		}
	});

	require('../src/routes/index.routes.js')(router);

	app.use('/service/api', router);
	app.use(middleware.errorToShow)

	return app;
}