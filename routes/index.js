const router = require('express').Router();
const getJSON = require('get-json')

const stations_obj = new (require('../model/Stations'))()


router.use(async (req, res, next) => {

	req.io.sockets.on('connection', function (socket) {

		socket.on('search_velib', function(type, value)  {
			console.log(type, value);
			let data_value = value;
			if(type == 'coordones'){ data_value = value.lat+','+value.lng }
			
			getJSON('http://localhost:3000/api/?'+ type +'=' + data_value, function(error, response){
				socket.emit('search_velib_response', response = response);
			})
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
