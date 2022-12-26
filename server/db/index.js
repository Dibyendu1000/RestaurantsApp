const { Pool } = require('pg');
 
/*const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432
});*/

const pool = new Pool();
 
module.exports = {
  query: (text, params) => pool.query(text, params),
};