const middleware = require('../middleware.js');

module.exports = function(router){
	const index = require('../controllers/index.controller.js');

	router.get('/', (req, res) => {
		res.json({'hello':'World!!!'})
	});

	router.get('/index', middleware.initialResponse, index.index, middleware.setJsonResponse);
}