import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Dropdown from './Dropdown.jsx'
import querystring from 'query-string'

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
    this.theSearch = this.theSearch.bind(this);
  };

  // convertDuration(minutes, seconds) {
  //   let millies = ((minutes*60)+seconds)*60;
  //   return `${millies}`;
  // }

   handleChange(event, newValue) {
    const newValues = this.state.values;
    newValues[event.target.id]=newValue;
    this.setState({...this.state, values:newValues});
  };

  artistInputHandler(e) {
    const newInput = e.target.value;
    return this.setState({...this.state, artistInput: newInput});
  }

  theSearch(e) {
    const theQueryObj = { seed_artists: this.state.artistInput };
    for(let i = 0; i<this.state.values.length-5; i++) {
      if(this.state.searchParameters[i].spotifyName==='_duration_ms'){
        theQueryObj[`min${this.state.searchParameters[i].spotifyName}`] = (this.state.searchParameters[i].min*360);
        theQueryObj[`max${this.state.searchParameters[i].spotifyName}`] = (this.state.searchParameters[i].max*360);         
      }
      theQueryObj[`min${this.state.searchParameters[i].spotifyName}`] = this.state.searchParameters[i].min;
      theQueryObj[`max${this.state.searchParameters[i].spotifyName}`] = this.state.searchParameters[i].max; 
    }
    fetch('/apiSpot/rec?'+ querystring.stringify(theQueryObj))
      .then(data => data.json())
      .then(results => console.log(results, 'results'));
  }


  render() {
    const dropdowns = [];
    
    for (let i = 0; i < this.state.searchParameters.length; i += 1) {
      dropdowns.push(<Dropdown key={'slider'+i} id={i} parameterObj={this.state.searchParameters[i]} values={this.state.values[i]} onChangeFunc={this.handleChange} />);
    }

    return (
      <Fragment>
      {/* <form onSubmit={this.props.handleSubmit}> */}
      <div className='searchbar'>
        <input name='artist' type='text'  onChange={this.artistInputHandler}></input> 
        <button className='theSpoogle' onClick={this.theSearch} >SPOOGLE</button> 
      </div>
      <div className="searchParams">
      {dropdowns}
      </div>
      </Fragment>
    )
  }
}




export default SearchBar;