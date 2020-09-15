require('dotenv').config();

const package = require('../package.json');
const sqlite = require('sqlite-async');
const confirm = require('prompt-confirm');

switch(package.version){
	case '1.0.0':
		(new confirm('Do you want to upgrade to 1.0.0?')).run()
			.then(result => {
				if(result) return sqlite.open(process.env.DB_PATH)
				else return new Promise((res, rej) => rej('cancel'));
			})
			.then(db => {
				db.run(`ALTER TABLE Record ADD COLUMN comment TEXT;`);
				db.run(`UPDATE Record SET comment='' WHERE comment IS NULL;`);
			})
			.catch(console.error);
		break;
	default:
		console.log('No upgrade script');
}
