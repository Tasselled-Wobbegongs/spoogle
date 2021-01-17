const express = require('express');
const router = express.Router();
// allowing access to dbController which is at ../controllers/dbController
const dbController = require('../controllers/dbController');

// submits a new user to the database
router.post('/:id',
    dbController.createUser,
    (req, res) => res.sendStatus(200)
)

// responds with every user currently in database
router.get('/', 
    dbController.allUsers, 
    (req, res) => res.status(200).json(res.locals.allUsers)
)

// responds with the requested user
router.get('/getUser/:id',
    dbController.getUser,
    (req, res) => res.status(200).json(res.locals.user)
)

// updates the current favorites stored in the database for a particular user
router.patch('/updateFav/:id', 
    dbController.updateFavorites, 
    (req, res) => res.sendStatus(200)
)

// deletes a specific user
router.delete('/:id',
    dbController.deleteUser,
    (req, res) => res.sendStatus(200)
)

// exports the routers used in a single cycle
module.exports = router;