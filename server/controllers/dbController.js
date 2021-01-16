// allowing access to query which is exported in 'models/dbModels.js'
const db = require('../models/dbModels.js');

// defining an empty object literal, will be populated while this file executes, then exported
const dbController = {};

// capture everything currently in the users
dbController.allUsers = (req, res, next) => {

    // query string to select everything from user table
    const getAllQuery = 'SELECT * FROM users'

    // submitting the query string to the database
    db.query(getAllQuery)

    // if successful, capture the db specific response
    .then(response => {
        res.locals = response
        next()
    })

    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            // logging a string
            log: `Database error`,
            // error status
            status: 502,
            // posting which middleware returned an error along with the error itself
            message: { err: `dbController.allUsers, ${error.stack}` }
        })
    })
}

// exports the completed dbController object
// dbController will be used in api.js
module.exports = dbController;