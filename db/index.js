const {Pool} = require('pg');
const {config} = require('../config');

const pool = new Pool({
    user: config.user,
    host: config.host,
    database: config.db,
    password: config.pass,
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
