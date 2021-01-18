import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function Dropdown(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState([props.parameterObj.min, props.parameterObj.max]);

  const handleChange = (event, newValue) => {
    props.onChangeFunc(props.id, newValue)
    setValue(newValue);
  };
  return (
    <div className="sliding">
      <Typography id="range-slider" className="tooltip" gutterBottom>
        {props.parameterObj.displayName}
        <span className="tooltiptext">{props.parameterObj.description}</span>
      </Typography>
      <Slider
        color="secondary"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={props.parameterObj.min}
        max={props.parameterObj.max}
      />
    </div>
  );
}




// const dropdown = (props) => {

//     // <div className="dropdown" style={{float: "left"}}>
//     //   <button className="dropbtn">{props.dropdownName}</button>
//     //   <div className="dropdown-content" style={{left:0}}>
//     //     <a href="#">20-50 BPM</a>
//     //     <a href="#">50-80 BPM</a>
//     //     <a href="#">80-120 BPM</a>
//     //     <a href="#">120-170 BPM</a>
//     //     <a href="#">170-200 BPM</a>
//     //   </div>
//     // </div>
//     // <div className="slidecontainer">
//     // <input type="range" min="1" max="100" value="50" class="slider" id="myRange"></input>
//     // <p>Value: <span id="demo"></span></p>
//     // </div>
//     // <script>
//     // var slider = document.getElementById("myRange");
//     // var output = document.getElementById("demo");
//     // output.innerHTML = slider.value;
    
//     // slider.oninput = function() {
//     //   output.innerHTML = this.value;
//     // }
//     // </script>
//   // )


// }



// export default Dropdown;