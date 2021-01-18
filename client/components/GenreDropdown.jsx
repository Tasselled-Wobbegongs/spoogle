import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import spotifyGenres from './genres';



export default function FreeSolo(props) {

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
      {/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      /> */}
    </div>
  );
}

