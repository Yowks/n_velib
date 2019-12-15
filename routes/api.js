const router = require('express').Router();

const Stations = require('../model/Stations.js');
const stations_obj = new Stations();


/* GET api page. */
router.get('/', async function(req, res) {
	let code, message, filter_type, filter_val;

	if (req.query.adress) {
		code = 200;
		message = 'Résultat avec l\'adresse';
		filter_type = 'adress';
		filter_val = req.query.adress;
	}
	else if (req.query.coordones) {
		code = 200;
		message = 'Résultat avec les coordones';
		filter_type = 'coordones';
		filter_val = req.query.coordones;
	}
	else{
		code = 404;
		message = 'Aucun résultats';
	}


	// la fonction getData récupère tout, a toi de faire passer les paramètres dans la fonction et mettre les filtres dans la requete
	const data = await stations_obj.getData();

	res.send({
		'code': code, 
		'message': message, 
		'type de filtre': filter_type,
		'valeur du filtre': filter_val,
		data});
});


module.exports = router;
