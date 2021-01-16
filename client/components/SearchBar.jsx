import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown.jsx'


// const handleDropdown = (e) => {
//   e.preventDefault();
//   /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
//   document.getElementById("tempoDropdown").classList.toggle("show");
//   // Close the dropdown if the user clicks outside of it
//   window.onclick = function(e) {
//     if (!e.target.matches('.dropbtn')) {
//       var tempDropdown = document.getElementById("tempoDropdown");
//     if (tempoDropdown.classList.contains('show')) {
//       tempoDropdown.classList.remove('show');
//       }
//     }
//   }
//   // send search params to server
//   // server responds with array of tracks, "data"
// }


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchParameters : ["target_danceability", "target_acousticness", "target_popularity", "target_valence", "target_tempo", "target_duration_ms"]
    }
  };

  render() {
    const dropdowns = [];
    
    for (let i = 0; i < this.state.searchParameters.length; i += 1) {
      dropdowns.push(<Dropdown dropdownName={this.state.searchParameters[i]}/>);
    }

    return (
      <Fragment>
      <form onSubmit={this.props.handleSubmit}>
        <input name='artist' type='text'></input> 
        <input type='submit' value='spoogle'></input> 
      </form>
      {dropdowns}
      {/* <div className="dropdown" style={{float: "left"}}>
        <button className="dropbtn">Danceability</button>
        <div className="dropdown-content" style={{left:0}}>
          <a href="#">Still as a Rock</a>
          <a href="#">Give a Little Sway</a>
          <a href="#"></a>
          <a href="#">Grooving Out</a>
          <a href="#">Spaz Out</a>
        </div>
      </div> */}
      <div className="dropdown" style={{float: "left"}}>
        <button className="dropbtn">Duration</button>
        <div className="dropdown-content" style={{left:0}}>
          <a href="#">20-50 BPM</a>
          <a href="#">50-80 BPM</a>
          <a href="#">80-120 BPM</a>
          <a href="#">120-170 BPM</a>
          <a href="#">170-200 BPM</a>
        </div>
      </div>
      <div className="dropdown" style={{float: "left"}}>
        <button className="dropbtn">Popularity</button>
        <div className="dropdown-content" style={{left:0}}>
          <a href="#">20-50 BPM</a>
          <a href="#">50-80 BPM</a>
          <a href="#">80-120 BPM</a>
          <a href="#">120-170 BPM</a>
          <a href="#">170-200 BPM</a>
        </div>
      </div>
      <div className="dropdown" style={{float: "left"}}>
        <button className="dropbtn">Tempo</button>
        <div className="dropdown-content" style={{left:0}}>
          <a href="#">20-50 BPM</a>
          <a href="#">50-80 BPM</a>
          <a href="#">80-120 BPM</a>
          <a href="#">120-170 BPM</a>
          <a href="#">170-200 BPM</a>
        </div>
      </div>
      <div className="dropdown" style={{float: "left"}}>
        <button className="dropbtn">Valence</button>
        <div className="dropdown-content" style={{left:0}}>
          <a href="#">20-50 BPM</a>
          <a href="#">50-80 BPM</a>
          <a href="#">80-120 BPM</a>
          <a href="#">120-170 BPM</a>
          <a href="#">170-200 BPM</a>
        </div>
      </div>
      </Fragment>
    )
  }
}


    {/* <div className="dropdown">
      <button className="dropbtn" onClick={handleDropdown}>Tempo</button>
      <div id="tempoDropdown" className="dropdown-content">
        <a href="#">20-50 BPM</a>
        <a href="#">50-80 BPM</a>
        <a href="#">80-120 BPM</a>
        <a href="#">120-170 BPM</a>
        <a href="#">170-200 BPM</a>
      </div>  
    </div> */}


// const TempoDropDown = () => {
//   return (
//     <div className="dropdown">
//       <button className="dropbtn" onClick={handleDropdown}>Tempo</button>
//       <div id="tempoDropdown" className="dropdown-content">
//         <a href="#">20-50 BPM</a>
//         <a href="#">50-80 BPM</a>
//         <a href="#">80-120 BPM</a>
//         <a href="#">120-170 BPM</a>
//         <a href="#">170-200 BPM</a>
//       </div>  
//     </div>
//   )
// }  


export default SearchBar;