const express = require('express');
const fetch = require('node-fetch');
const querystring = require('query-string')
const spotController = require('../controllers/spotController.js');

const router = express.Router();

const client_id = 'cc4f085fa7444ed6a9f2673da73ca71c'; 
const client_secret = '576f34942b7e4a0f97c8d511a6e51951'; 
const redirect_uri = 'http://localhost:3000/apiSpot/callback'; // Your redirect uri
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */


router.get('/login', spotController.reqAuth, (req, res) =>  res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
  response_type: 'code',
  client_id: client_id,
  scope: res.localsscope,
  redirect_uri: redirect_uri,
  state: res.locals.state
})));

router.get('/callback', (req, res) => console.log('YAYAYA'));

const header = { headers:{"Accept": "application/json", "Content-Type": "application/json",  
'Authorization': 'BQDKyUBhQptBnPBcawT4uHKkBmdv-RBNYMIoNXwW_WLUvbKSTaF2R69KTonrwgpg57yb0ZWAJTTS30XkzpCUrFlF4q4aNp9Ls_L7INVLloUGNS0Hp7StFJWVmjuLbEaKgIiWt1Ygwg'}}


// router.get('/refresh_token');
router.get('/track', spotController.getTrack, (req, res) => res.status(200).json(res.locals.track));

module.exports = router; 