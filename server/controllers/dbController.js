// allowing access to query which is exported in 'models/dbModels.js'
const db = require('../models/dbModels.js');
// defining an empty object literal, will be populated while this file executes, then exported
const dbController = {};

// add a user to the database
dbController.createUser = (req, res, next) => {
    // query string to add a new user to the database
    // expects a userId(num) and list of favorites (empty array if no favorites)
    const createUserQuery = `
    INSERT INTO users (userId, favorites)
    VALUES (${req.params.id}, '${req.body.favorites}')`

    // submitting the createUserQuery string to the database
    db.query(createUserQuery)
    // if successful, will respond with a status of 200
    .then(response => {
        next()
    })
    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            log:`Database error`,
            // status code
            status: 502,
            // posting which middleware returned an error along with the error itself
            message: { err: `dbController.createUser, ${error.stack}`}
        })
    })
}

// capture everything currently in the users
dbController.allUsers = (req, res, next) => {
    // query string to select everything from user table
    const getAllQuery = 'SELECT * FROM users'

    // submitting getAllQuery to the database
    db.query(getAllQuery)
    // if successful, it will respond with all users
    .then(response => {
        res.locals.allUsers = response.rows
        next()
    })
    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            log: `Database error`,
            // status code
            status: 502,
            // posting which middleware returned an error along with the error itself
            message: { err: `dbController.allUsers, ${error.stack}` }
        })
    })
}

// get a specific user from the database
dbController.getUser = (req, res, next) => {
    // query string to select a single user from users table
    // expects a user id
    const getOneUser = `SELECT * FROM users WHERE userId = ${req.params.id}`

    // submitting getOneUser to the database
    db.query(getOneUser)
    // if successful, it will respond with the requested user
    .then(response => {
        res.locals.user = response.rows
        next()
    })
    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            log: `Database error`,
            // status code
            status: 502,
            // posting which middleware returned an error along with the error itself
            message: {err: `dbController.getUser, ${err.stack}`}
        })
    })
}

// update current list of favorites for a specific user
dbController.updateFavorites = (req, res, next) => {
    // query string to update favorites list
    // expects a userId(num) and the updated list of favorites, will overwrite current favorites
    const updateFavsQuery = `
    UPDATE users
    SET favorites = '${req.body.favorites}'
    WHERE userId = '${req.params.id}'`

    // submitting updateFavsQuery to the database
    db.query(updateFavsQuery)
    // if successful, it will respond with a status of 200
    .then(response => {
        next()
    })
    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            log: `Database error`,
            // status code
            status: 502,
            // posting which middleware returned an error along with the error itself
            message: {err: `dbController.updateFavorites, ${err.stack}`}
        })
    })
}

// delete a single user from the database
dbController.deleteUser = (req, res, next) => {
    // query string to delete a user
    // expects a userId(num)
    const deleteQuery = `DELETE FROM users
    WHERE userId = ${req.params.id}`

    // submitting deleteQuery to the database
    db.query(deleteQuery)
    // if successful, it will respond with a status of 200
    .then(response => {
        next()
    })
    // if unsuccessful, make me aware of any error
    .catch(err => {
        return next({
            log: `Database error`,
            // status code
            status: 502,
            // posting which middleware returned an error along with the error  itself
            message: {err: `dbController.deleteUser, ${err.stack}`}
        })
    })
}

// exports the completed dbController object
// dbController will be used in api.js
module.exports = dbController;