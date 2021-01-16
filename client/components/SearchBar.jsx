import React from 'react';
import ReactDOM from 'react-dom';

const SearchBar = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input name='artist' type='text'></input> 
      <input type='submit' value='spoogle'></input> 
    </form>
  )

const TempoDropDown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Tempo</button>
      <div id="tempoDropdown" className="dropdown-content">
        <a href="#">20-50 BPM</a>
        <a href="#">50-80 BPM</a>
        <a href="#">80-120 BPM</a>
        <a href="#">120-170 BPM</a>
        <a href="#">170-200 BPM</a>
    </div>


  )
}  

}

export default SearchBar;