import React from 'react';
import ReactDOM from 'react-dom';

const getAlbumCover = (track) => {
  const albumImages = track.album.images;
  return albumImages[albumImages.length - 1].url;
}

const convertDuration = (durationInMs) => {
  const totalSeconds = Math.floor(durationInMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  if (seconds < 10) seconds = '0' + seconds;
  return `${minutes}:${seconds}`;
}

const SearchResultRow = ({ track }) => {
  let artists = '';
  track.artists.forEach((artist, index) => {
    artists += artist.name;
    if (index !== track.artists.length - 1) {
      artists += ', '
    }
  });

  return (
    <div className="results-row">
      <div><img src={getAlbumCover(track)} /></div>
      <div>{track.name}</div>
      <div>{artists}</div>
      <div>{track.audio_features.tempo}</div>
      <div>{convertDuration(track.duration_ms)}</div>
    </div>
  );
}

export default SearchResultRow;