import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './../../styles.css';
import SearchResultRow from './SearchResultRow.jsx';
import SearchBar from './SearchBar.jsx'
import sampleTracks from './sampleTracks';
// import spotifyGenres from './genres';


const App = () => {
  const [ results, setResults ] = useState(sampleTracks);
  const [ favorites, setFavorites ] = useState([]);

  // const genreArr = spotifyGenres["genres"];
  // console.log(genreArr)  

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

  const resultsRows = results.map( (track, index) => (
    <SearchResultRow  key={`searchResult${index}`} track={track} favorites={favorites} toggleFavorite={toggleFavorite} />
  ));

  return (
    <Fragment key='appfragment'>
        <img id='Spoogo' src='client/assets/image.png' />
        <SearchBar key='searchbar1'/>
      <div className="results-grid">
        {resultsRows}
      </div>
    </Fragment>
  );
}

export default App;
