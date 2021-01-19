import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import spotifyGenres from './genres';



function GenreDrop(props) {

  const genreArr = spotifyGenres["genres"];

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={(event, newValue) => props.onChangeFunc(newValue)}
        options={genreArr}
        renderInput={(params) => (
          <TextField {...params} label="Search by Genre" margin="normal" variant="outlined" onChange={props.onChangeFunc} />
        )}
      />
    </div>
  );
}

export default GenreDrop;
