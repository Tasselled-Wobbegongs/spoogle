import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './../../styles.css';
import SearchBar from './SearchBar.jsx';
import SearchResultRow from './SearchResultRow.jsx';
import sampleTracks from './sampleTracks';

const App = () => {
  const [ results, setResults ] = useState([sampleTracks[0], sampleTracks[0]]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // send search params to server
    // server responds with array of tracks, "data"
    setResults(sampleTracks);
  }

  const resultsRows = results.map(track => (
    <SearchResultRow track={track} />
  ));

  return (
    <Fragment>
      <SearchBar handleSubmit={handleSubmit} />
      <div className="results-grid">
        {resultsRows}
      </div>
    </Fragment>
  );
}

export default App;