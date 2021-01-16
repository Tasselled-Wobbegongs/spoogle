const express = require('express');
const router = express.Router();

const dbController = require('../controllers/apiDB');

// respond with every user currently in database
router.get('/', 
    dbController.allUsers,
    (req, res) => res.status(200).json({})
)

// exports the currently used routers under the
module.exports = router;