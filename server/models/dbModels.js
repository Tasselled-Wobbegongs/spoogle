const { Pool } = require('pg')

// string from elephantSQL
const PG_URI = 'postgres://spnejdcl:H3a9Z7hJwE2Jo4Xa0645Pa7TFrqh6zTA@lallah.db.elephantsql.com:5432/spnejdcl'

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
        console.log(`Executed query: ${text}`)
        return pool.query(text, params, callback)
    }
}