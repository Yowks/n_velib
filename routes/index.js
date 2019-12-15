const router = require('express').Router();

const stations_obj = new (require('../model/Stations'))()


router.use(async (req, res, next) => {

	req.io.sockets.on('connection', function (socket) {

		socket.on('search_velib', function(type, value)  {
			console.log(type, value);
		});
	
	});
	
	next();
});


/* GET home page. */
router.get('/', async function(req, res, next) {
	const data = await stations_obj.getData();

	res.render('index')
});

module.exports = router;
