const { Pool } = require('pg')

// string from elephantSQL
const PG_URI = 'postgres://spnejdcl:H3a9Z7...@lallah.db.elephantsql.com:5432/spnejdcl'

// creating a pool
const pool = new Pool({
    // connecting the database to our application
    // the app will make db calls in controllers
    connectionString: PG_URI
})

// exporting an object with a property named query
// query is a function that returns the invocation of poolquery() after logging the query required in controller, it is the access point to the database
module.exports = {
    query: (text, params, callback) => {
        // will log which query string was executed
        console.log(`executed query: ${text}`)
        return pool.query(text, params, callback)
    }
}