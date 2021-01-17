const express = require('express');
const fetch = require('node-fetch');
const spotController = require('../controllers/spotController.js');

const router = express.Router();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */


router.get('/login', spotController.reqAuth, (req, res) =>  res.redirect(res.locals.spotRedirect));

router.get('/callback/', (req, res) => (console.log('YAYAYA'), res.status(200).json('YOOOOOO')));

// router.get('/refresh_token');
router.get('/rec/', spotController.getToken, spotController.getRecs, spotController.getSpecs, (req, res) => {
  res.status(200).json(res.locals.queryResults);
});

module.exports = router;