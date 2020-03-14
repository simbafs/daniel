const bcrypt = require('bcryptjs');
require('dotenv').config();

let User;

function init(){
	const sqlite = require('sqlite-async');
	sqlite.open('./db/user.db')
		.then((db) => {
			console.log('Open DB');
			User = db
			return db.run(`CREATE TABLE IF NOT EXISTS User (
				username STRING,
				password STRING,
				realname STRING
			)`)
		})
		.catch(console.error);
}

/**
 * login
 * @params {string} username - username
 * @params {string} password - password
 */
function login(username, password){
	return User.all(`SELECT * FROM User WHERE username = '${username}'`)
		.then(data => {
			if(data.length == 0) throw new Error('User not found');
			if(data.length != 1) throw new Error('DB is broken');

			return bcrypt.compare(password, data[0].password)
				.then(status => {
					if(status) return data[0]
				}).catch(console.error);
		})
		.catch(console.error)
}

function register(username, password, realname){
	bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
		.then((hash) => {
			return User.run(`INSERT INTO User VALUES ('${username}', '${hash}', '${realname}')`)
		})
		.catch(console.error);
}

module.exports = (mode) => {
	const handler = {
		init: init,
		login: login,
		register: register 
	}
	return handler[mode] || (() => new Error('Error mode'));
}

