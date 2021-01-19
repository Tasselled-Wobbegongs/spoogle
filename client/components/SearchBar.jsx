import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Filters from './Filters.jsx'
import querystring from 'query-string'
import GenreDrop from './GenreDropdown.jsx'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genreInput: '',
      // artistInput: '',
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
    this.genreInputHandler = this.genreInputHandler.bind(this);
  };

   handleChange(id, value) {
    const newValues = this.state.values;
    newValues[id]=value;
    this.setState({...this.state, values:newValues});
  };

  genreInputHandler(e)  {
    let newInput;
    if (e.target) newInput = e.target.value;
    else newInput = e;

    return this.setState({...this.state, genreInput: newInput});
  }

  render() {
    const sliders = [];
    
    for (let i = 0; i < this.state.searchParameters.length; i += 1) {
      sliders.push(<Filters key={'slider'+i} id={i} parameterObj={this.state.searchParameters[i]} values={this.state.values[i]} onChangeFunc={this.handleChange} />);
    }

    return (
      <Fragment>
        <div className='searchbar'>
        <GenreDrop onChangeFunc={this.genreInputHandler} />
        </div>
        <div className="searchParams">
        {sliders}
        </div>
        <button className='theSpoogle' onClick={() => { this.props.submitSearch(this.state) }} >Let's SPOOGLE it!</button> 
      </Fragment>
    )
  }
}

export default SearchBar;