const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');

// respond with every user currently in database
router.get('/', 
    dbController.allUsers,
    (req, res) => res.status(200).json(res.locals.all)
)

// exports the currently used routers under the
module.exports = router;