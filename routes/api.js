const router = require('express').Router();

const Stations = require('../model/Stations.js');
const stations_obj = new Stations();


/* GET api page. */
router.get('/', function(req, res) {
	res.send({'code': 404, 'message': 'Requete invalide'});
});



router.get('/:adress', async function (req, res) {
	let adress = req.params.adress;
	const data = await stations_obj.getData();
	res.send({'code': 200, 'message': 'OK', data});
	
})

module.exports = router;
