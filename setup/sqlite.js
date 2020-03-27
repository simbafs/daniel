const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;
const sqlite = require('sqlite-async');
require('dotenv').config();

let DB;

function init(){
	sqlite.open(process.env.DB_PATH)
		.then((db) => {
			console.log('Open DB');
			DB = db;
			db.run(`CREATE TABLE IF NOT EXISTS User (
				username TEXT,
				password TEXT,
				realname TEXT,
				id STRING 
			)`)
			db.run(`CREATE TABLE IF NOT EXISTS Record (
				id INTEGER,
				content TEXT,
				author TEXT,
				date DATE
			)`);
		})
		.catch(console.error);
}

function login(username, password){
	return DB.all(`SELECT * FROM User WHERE username = '${username}'`)
		.then(data => {
			if(data.length == 0) return { status: 404, error: 'User not found' };
			if(data.length != 1) return { status: 500, error: 'User is broken'};

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

function signup(username, password, realname){
	return DB.all(`select count(username) from User where username = '${username}'`)
		.then((data) => {
			if(data[0]['count(username)'] === 0) return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
		})
		.then(async (hash) => {
			if(!hash) return {
				status: 400,
				error: 'username exist'
			};
			await DB.all(`INSERT INTO User VALUES ('${username}', '${hash}', '${realname}', '${uuid()}')`)
			return {
				username: username,
				realname: realname,
				id: hash
			};
		})
		.catch(console.error);
}

async function load(data){
	const stat = await DB.prepare(`INSERT INTO Record VALUES (?, ?, ?, ?)`);
	if(!Array.isArray(data)) data = [data];
	for(let i of data){
		if(typeof i === 'string'){
			stat.run(
				uuid(),
				i,
				'unknown',
				(new Date()).toISOString()
			);
		}else{
			stat.run(
				uuid(),
				i.content,
				i.author,
				(new Date()).toISOString()
			);
		}
	}
	stat.finalize();
}

let get = () => DB.all(`SELECT * FROM Record`);
let remove = id => DB.run(`DELETE FROM Record WHERE id IN (${id})`);
let exportDB = () => DB

/*
setTimeout(async () => {
	load(require('../db/record.js'));
}, 2000);
//*/

module.exports = {
	init: init,
	login: login,
	signup: signup,
	DB: exportDB,
	load: load,
	get: get,
	remove: remove 
}

