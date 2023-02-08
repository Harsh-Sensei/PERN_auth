const {Pool} = require('pg');
let {config} = require('./config');
// console.log(config)
// return;
config = {user : 'postgres', host : 'localhost', port : 5432, db : 'lab2db', pass : 'ben10ua'}
const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.db,
    password: config.pass,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
