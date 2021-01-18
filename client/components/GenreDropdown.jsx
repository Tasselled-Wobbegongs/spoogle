import React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import spotifyGenres from './genres';



export default function FreeSolo(props) {

  const genreArr = spotifyGenres["genres"];
  console.log(genreArr)

  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={genreArr}
        renderInput={(params) => (
          <TextField {...params} label="Search by Genre" margin="normal" variant="outlined" />
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

