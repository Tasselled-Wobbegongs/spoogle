const fetch = require("node-fetch");
const spotController = {};

const client_id = 'cc4f085fa7444ed6a9f2673da73ca71c';
const client_secret = '576f34942b7e4a0f97c8d511a6e51951'; 
const redirect_uri = 'http://localhost:3000/callback'

const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
const stateKey = 'spotify_auth_state';

spotController.reqAuth = (req, res, next) => {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    const scope = 'user-read-private user-read-email';
    res.locals.scope = scope;
    res.locals.client_id = client_id;
    res.locals.client_secret = client_secret;
    res.locals.redirect_uri = redirect_uri;
    next();
  };


spotController.getAuth = (req, res, next) => {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          const access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  }

spotController.refreshToken = (req, res, next) => {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  };

spotController.getToken = (req, res, next) => {

  fetch('https://accounts.spotify.com/api/token', {
    method:'POST', 
    headers:{'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')), "Content-Type": "application/x-www-form-urlencoded"}, 
    body: 'grant_type=client_credentials' })
    .then( data => JSON.stringify(data))
    .then( result => (console.log(result), res.locals.authToken = result, next()));
}

spotController.getTrack = (req, res, next) => {
    fetch('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl?market=ES', {headers: {'Authorization': res.locals.authToken}})
        .then( results => JSON.stringify(results))
        .then( parsedData => (res.locals.track = parsedData, next()))
        .catch( err => next(err));
};


module.exports = spotController;