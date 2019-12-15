const router = require('express').Router();
const getJSON = require('get-json')

const stations_obj = new (require('../model/Stations'))()


router.use(async (req, res, next) => {
	let data_filter;

	req.io.sockets.on('connection', function (socket) {

		socket.on('search_velib', function(type, value)  {
			console.log(type, value);
			getJSON('http://localhost:3000/api/?'+ type +'=' + value, function(error, response){
				data_filter = response;
			})
			console.log(data_filter);

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
