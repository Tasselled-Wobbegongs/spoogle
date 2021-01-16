const express = require('express');
const fetch = require('node-fetch');
const spotController = require('../controllers/spotController.js');

const router = express.Router();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */


router.get('/login', spotController.reqAuth, (req, res) =>  res.redirect(res.locals.spotredirect));

router.get('/callback', (req, res) => console.log('YAYAYA'));

// router.get('/refresh_token');
router.get('/track', spotController.getTrack, (req, res) => res.status(200).json(res.locals.track));

module.exports = router; 