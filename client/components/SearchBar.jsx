import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown.jsx'
<<<<<<< HEAD
import querystring from 'query-string'
import FreeSolo from './GenreDropdown.jsx'
=======
>>>>>>> 6d86841680e99bad5c841deda15946ebf521da91

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      artistInput: '',
      values: [[0,100],[0,100],[0,220],[0,100],[0,100],[0,15]],
      searchParameters : [ 
        {spotifyName: "_danceability", displayName: "Danceability",description: "A little side-step or in the mood to salsa?",min: 0,max: 100,},
        {spotifyName: "_acousticness",displayName: "Acousticness",description: "Coffee shop vibes or a raging concert?",min: 0,max: 100,},
        {spotifyName: "_tempo", displayName: "Tempo",description: "Still your heart or get the adrenaline pumping?",min: 0,max: 220,},
        {spotifyName: "_valence", displayName: "Valence",description: "Down in the dumps or feeling euphoric?",min: 0,max: 100,},
        {spotifyName: "_popularity", displayName: "Popularity",description: "Explore new artists or in with the radio tunes?",min: 0,max: 100,},
        {spotifyName: "_duration_ms", displayName: "Duration",description: "Just a quickie or a marathon?",min: 0,max: 15,}
      ]
    }
    this.handleChange = this.handleChange.bind(this);
    this.artistInputHandler = this.artistInputHandler.bind(this);
  };

   handleChange(event, newValue) {
    const newValues = this.state.values;
    newValues[event.target.id]=newValue;
    this.setState({...this.state, values:newValues});
  };

  artistInputHandler(e) {
    const newInput = e.target.value;
    return this.setState({...this.state, artistInput: newInput});
  }

  render() {
    const dropdowns = [];
    
    for (let i = 0; i < this.state.searchParameters.length; i += 1) {
      dropdowns.push(<Dropdown key={'slider'+i} id={i} parameterObj={this.state.searchParameters[i]} values={this.state.values[i]} onChangeFunc={this.handleChange} />);
    }

    return (
      <Fragment>
<<<<<<< HEAD
      {/* <form onSubmit={this.props.handleSubmit}> */}
 
      <div className='searchbar'>
      <FreeSolo />
        <input name='artist' type='text'  onChange={this.artistInputHandler}></input> 
        <button className='theSpoogle' onClick={this.theSearch} >SPOOGLE</button> 
      </div>
      <div className="searchParams">
      {dropdowns}
      </div>
=======
        <div className='searchbar'>
          <input name='artist' type='text'  onChange={this.artistInputHandler}></input> 
          <button className='theSpoogle' onClick={() => { this.props.submitSearch(this.state) }} >SPOOGLE</button> 
        </div>
        <div className="searchParams">
        {dropdowns}
        </div>
>>>>>>> 6d86841680e99bad5c841deda15946ebf521da91
      </Fragment>
    )
  }
}

<<<<<<< HEAD





=======
>>>>>>> 6d86841680e99bad5c841deda15946ebf521da91
export default SearchBar;