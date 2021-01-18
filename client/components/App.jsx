import React, { useState, Fragment } from 'react';
import './../../styles.css';
import SearchResultRow from './SearchResultRow.jsx';
import SearchBar from './SearchBar.jsx'
<<<<<<< HEAD
import sampleTracks from './sampleTracks';
// import spotifyGenres from './genres';

=======
import querystring from 'query-string'
>>>>>>> 6d86841680e99bad5c841deda15946ebf521da91

const App = () => {
  const [ results, setResults ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);

<<<<<<< HEAD
  // const genreArr = spotifyGenres["genres"];
  // console.log(genreArr)  
=======
  const submitSearch = (state) => {
    const theQueryObj = { seed_artists: state.artistInput };
    for (let i = 0; i< state.values.length-5; i++) {
      if(state.searchParameters[i].spotifyName==='_duration_ms'){
        theQueryObj[`min${state.searchParameters[i].spotifyName}`] = (state.searchParameters[i].min*360);
        theQueryObj[`max${state.searchParameters[i].spotifyName}`] = (state.searchParameters[i].max*360);         
      }
      theQueryObj[`min${state.searchParameters[i].spotifyName}`] = state.searchParameters[i].min;
      theQueryObj[`max${state.searchParameters[i].spotifyName}`] = state.searchParameters[i].max; 
    }

    fetch('/apiSpot/rec?'+ querystring.stringify(theQueryObj))
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setResults(data);
      });
  }
>>>>>>> 6d86841680e99bad5c841deda15946ebf521da91

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
    <SearchResultRow  key={`searchResult${index}`} track={track} favorites={favorites} toggleFavorite={toggleFavorite} />
  ));

  return (
    <Fragment key='appfragment'>
        <img id='Spoogo' src='client/assets/image.png' />
        <SearchBar key='searchbar1' submitSearch={submitSearch} />
      <div className="results-grid">
        {resultsRows}
      </div>
    </Fragment>
  );
}

export default App;
