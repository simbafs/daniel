const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;
const sqlite = require('sqlite-async');
require('dotenv').config();

let User;

function init(){
	sqlite.open('./db/user.db')
		.then((db) => {
			console.log('Open DB');
			User = db
			return db.run(`CREATE TABLE IF NOT EXISTS User (
				username STRING,
				password STRING,
				realname STRING,
				id STRING 
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
			if(data.length == 0) return { status: 404, error: 'User not found' };
			if(data.length != 1) return { status: 500, error: 'DB is broken'};

			return bcrypt.compare(password, data[0].password)
				.then(status => {
					if(status) return {
						...data[0],
						status: 200,
						error: null
					};
					else return {
						status: 403,
						error: 'Invalid password'
					}
				}).catch(console.error);
		})
		.catch(console.error)
}

function register(username, password, realname){
	User.run(`SELECT * FROM User WHERE username = '${username}'`)
		.then((data) => {
			if(!data) return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
		})
		.then((hash) => {
			return User.run(`INSERT INTO User VALUES ('${username}', '${hash}', '${realname}', '${uuid()}')`)
		})
		.catch(console.error);
}

module.exports = (mode) => {
	const handler = {
		init: init,
		login: login,
		register: register,
		User: User
	}
	return handler[mode] || (() => new Error('Error mode'));
}

