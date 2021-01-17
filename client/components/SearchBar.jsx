import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown.jsx'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [[0,100],[0,100],[0,220],[0,100],[0,100],[0,15]],
      searchParameters : [ 
        {spotifyName: "target_danceability", displayName: "Danceability",description: "A little side-step or in the mood to salsa?",min: 0,max: 100,},
        {spotifyName: "target_acousticness",displayName: "Acousticness",description: "Coffee shop vibes or a raging concert?",min: 0,max: 100,},
        {spotifyName: "target_tempo", displayName: "Tempo",description: "Still your heart or get the adrenaline pumping?",min: 0,max: 220,},
        {spotifyName: "target_valence", displayName: "Valence",description: "Down in the dumps or feeling euphoric?",min: 0,max: 100,},
        {spotifyName: "target_popularity", displayName: "Popularity",description: "Explore new artists or in with the radio tunes?",min: 0,max: 100,},
        {spotifyName: "target_duration_ms", displayName: "Duration",description: "Just a quickie or a marathon?",min: 0,max: 15,}
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  };

  convertDuration(minutes, seconds) {
    let millies = ((minutes*60)+seconds)*60;
    return `${millies}`;
  }
   handleChange(event, newValue) {
    const newValues = this.state.values;
    newValues[event.target.id]=newValue;
    console.log(newValues)
    this.setState({...this.state, values:newValues});
  };
  
  render() {
    console.log(this.state.values[0])
    const dropdowns = [];
    
    for (let i = 0; i < this.state.searchParameters.length; i += 1) {
      dropdowns.push(<Dropdown key={'slider'+i} id={i} parameterObj={this.state.searchParameters[i]} values={this.state.values[i]} onChangeFunc={this.handleChange} />);
    }

    return (
      <Fragment>
      {/* <form onSubmit={this.props.handleSubmit}> */}
      <form>
        <input name='artist' type='text'></input> 
        <input type='submit' value='spoogle'></input> 
      </form>
      <div className="searchParams">
      {dropdowns}
      </div>
      </Fragment>
    )
  }
}




export default SearchBar;