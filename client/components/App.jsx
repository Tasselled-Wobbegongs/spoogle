import React, { useState, useEffect, Fragment } from 'react';
import './../../styles.css';
import SearchResultRow from './SearchResultRow.jsx';
import SearchBar from './SearchBar.jsx'
import querystring from 'query-string'

const App = () => {
  const [ results, setResults ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
  const [ deviceId, setDeviceId ] = useState(undefined);
  const [ spotifyPlayer, setSpotifyPlayer ] = useState(undefined);
  const [ token, setToken ] = useState('BQD0TJkFyPEGgOZV4r8_BpZQQxVi05OkyZMH9dTsNQ1i0VmpK2-Hb3109BIpqNzx6vSE6NYTKxUsn1EuRR8NhGwYIRuvCARwqT7hP84PJICSF7cBSSCkU1eO1Goulbcu95n3vNhxBlP0Ky49o182s2xhHw5LqQyRlfKrgNdbBE5xmm1Qt_lzI38');
  const [ currentTrack, setCurrentTrack ] = useState(undefined);
  const [ isPlaying, setIsPlaying ] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'Spoogle',
        getOAuthToken: cb => { cb(token); }
      });

      setSpotifyPlayer(player);
    
      // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });
    
      // Ready - Ready with Device ID
      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
      });
    
      // Not Ready - Device ID has gone offline
      player.addListener('not_ready', ({ device_id }) => {
        setDeviceId(undefined);
      });
    
      // Connect to the player!
      player.connect();
    };
  }, []);

  const togglePlay = (trackURI) => {
    if (trackURI !== currentTrack) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [trackURI] }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(() => {
          setCurrentTrack(trackURI);
          setIsPlaying(true);
        });
    } else if (isPlaying) {
      spotifyPlayer.pause().then(() => {
        setIsPlaying(false);
      });
    } else {
      spotifyPlayer.resume().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const submitSearch = (state) => {
    const theQueryObj = { seed_genres: state.genreInput };
    for (let i = 0; i< state.values.length; i++) {
      if(state.searchParameters[i].spotifyName==='_tempo') {
        if(state.values[i][1] !== 220 || state.values[i][0] !== 0){
          theQueryObj[`min${state.searchParameters[i].spotifyName}`] = (state.values[i][0]);
          theQueryObj[`max${state.searchParameters[i].spotifyName}`] = (state.values[i][1]);
        }
      }
      else if(state.searchParameters[i].spotifyName==='_duration_ms'){
        if(state.values[i][1] !== 15 || state.values[i][0] !== 0){
          theQueryObj[`min${state.searchParameters[i].spotifyName}`] = (state.values[i][0]*60000);
          theQueryObj[`max${state.searchParameters[i].spotifyName}`] = (state.values[i][1]*60000);
        }
      }
      else if (state.values[i][1] !== 100 || state.values[i][0] !== 0) {
        theQueryObj[`min${state.searchParameters[i].spotifyName}`] = state.values[i][0];
        theQueryObj[`max${state.searchParameters[i].spotifyName}`] = state.values[i][1]; 
      }
    }

    fetch('/apiSpot/rec?'+ querystring.stringify(theQueryObj))
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setResults(data);
      });
  }

  const toggleFavorite = (trackId, isFavorite) => {
    // PLACEHOLDER ONLY, SYNC WITH DATABASE
    if (isFavorite) {
      alert('removing favorite');
      setFavorites([]);
    } else {
      alert('adding favorite');
      setFavorites([...favorites, trackId]);
    }
  }

  const resultsRows = results.map((track, index) => (
    <SearchResultRow
      key={`searchResult${index}`}
      track={track}
      isPlaying={(track.uri === currentTrack) && isPlaying}
      togglePlay={togglePlay}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  ));

  return (
    <Fragment key='appfragment'>
        {/* <img id='Spoogo' src='client/assets/image.png' /> */}
        <img id="Spoogo" src="client/assets/logo.svg" />
        <SearchBar key='searchbar1' submitSearch={submitSearch} />
      <div className="results-grid">
        {resultsRows}
      </div>
    </Fragment>
  );
}

export default App;
