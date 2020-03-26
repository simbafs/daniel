const router = require('express').Router();
const auth = require('../setup/auth.js');
const { get, load, remove } = require('../setup/sqlite.js');

router.get('/',/* auth,*/ (req, res, next) => {
	get().then(data => {
		res.render('admin', {
			data: data
		});
	});
});

router.post('/',/* auth,*/ (req, res, next) => {
	let removedIndex = JSON.parse(req.body.removed);
	get().then(data => {
		let removedId = data
			.filter((item, index) => removedIndex.includes(index))
			.map(item => `'${item.id}'`)
			.join(', ');
		remove(removedId);
		res.send(removedId);
	});

});

module.exports = router;
