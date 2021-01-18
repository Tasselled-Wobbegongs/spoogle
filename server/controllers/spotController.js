const fetch = require("node-fetch");
const querystring = require('query-string')
const { client_id, client_secret, redirect_uri } = require('./spotifysecret')

const spotController = {};

const generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  

spotController.reqAuth = (req, res, next) => {
  console.log('YAY')
  const stateKey = 'spotify_auth_state';

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email';

  const spotifyRedirect = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: 'http://localhost:3000/apiSpot/callback',
    state: state
  })


  res.locals.spotRedirect = spotifyRedirect;
  console.log(res.locals.spotRedirect, "URI")
  next();
};


spotController.getAuth = (req, res, next) => {

    // your application requests refresh and access tokens
    // after checking the state parameter
    const stateKey = 'spotify_auth_state';
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
  const BasicKey = (Buffer.from(client_id + ':' + client_secret).toString('base64'))
  fetch('https://accounts.spotify.com/api/token', {
    method:'POST', 
    headers:{'Authorization': 'Basic ' + BasicKey, "Content-Type": "application/x-www-form-urlencoded"}, 
    body: 'grant_type=client_credentials' })
    .then( data => data.text()) 
    .then( json => JSON.parse(json)) 
    .then( result => (res.locals.authToken = result.access_token, next()))
    .catch(err => next(err));
}

spotController.getRecs = (req, res, next) => {
  console.log(req.query)
  const query = "https://api.spotify.com/v1/recommendations?limit=25&" + querystring.stringify(req.query);
  fetch(query, {headers: {'Authorization': "Bearer " + res.locals.authToken}})
    .then(data => data.json())
    .then(data => {
      res.locals.queryResults = data.tracks;
      return next();
    })
    .catch(err => next(err));
};

spotController.getSpecs = (req, res, next) => {
  console.log('testing');
  return next();
}


module.exports = spotController;