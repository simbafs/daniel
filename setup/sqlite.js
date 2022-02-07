const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;
const sqlite = require('sqlite-async');
require('dotenv').config();

let DB;

function error(...e){
	console.error(...e);
	return new Error('Something error');
}

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
	return DB.all(`SELECT * FROM User WHERE username = ?`, username)
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
	let error = [];
	if(!username) error.push('username');
	if(!password) error.push('password');
	if(!realname) error.push('realname');
	if(error.length > 0) return new Promise((res, rej) => {
		rej(`${error.join(', ')} undefined`);
	});

	return DB.all(`SELECT count(username) FROM User WHERE username = ?`, username)
		.then((data) => {
			if(data[0]['count(username)'] === 0) return bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
		})
		.then(async (hash) => {
			if(!hash) return {
				status: 400,
				error: 'username exist'
			};
			await DB.all(`INSERT INTO User VALUES (?, ?, ?, ?)`, username, hash, realname, uuid())
			return {
				username: username,
				realname: realname,
				id: hash
			};
		})
		.catch(error);
}

async function load(data){
	const stat = await DB.prepare(`INSERT INTO Record VALUES (?, ?, ?, ?)`);
	if(!Array.isArray(data)) data = [data];
	for(let i of data){
		if(typeof i === 'string'){
			stat.run(
				uuid(),
				i.toString(),
				'unknown',
				(new Date()).toISOString()//,
				// ''
			);
		}else{
			stat.run(
				uuid(),
				i.content.toString(),
				i.author.toString(),
				(new Date()).toISOString()//,
				// i.comment.toString()
			);
		}
	}
	stat.finalize();
}

function get(table = 'Record'){
	if(!(['Record', 'User'].includes(table))) return new Promise((res, rej) => {
		rej('Error table');
	});
	return DB.all(`SELECT * FROM ${table}`)
		.then(data => data)
}
async function remove(id, table = 'Record'){
	if(!(['Record', 'User'].includes(table))) return new Promise((res, rej) => {
		rej('Error table');
	});
	let stm = await DB.prepare(`DELETE FROM ${table} WHERE id=?`);
	id.forEach(async (item) => await stm.run(item));
	await stm.finalize();
	return new Promise((res, rej) => {
		res(id);
	});
}
let exportDB = () => DB;

/*
setTimeout(async () => {
	//	require('../db/record.js')
	//	remove('asdf','ssvs').then(console.log).catch(console.error);
	signup('kenny.faas@gmail.com', 'simbass').then(console.error).catch(console.error);
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

