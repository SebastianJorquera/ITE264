const Pool = require('pg').Pool

//connection to postgres database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'googleemail21',
    port: 5432,
    disableHostCheck: true
})

module.exports = pool;