const router = require('express').Router();

const stations_obj = new (require('../model/Stations'))()



/* GET home page. */
router.get('/', async function(req, res, next) {
	const data = await stations_obj.getData();

	res.render('index')
});

module.exports = router;
