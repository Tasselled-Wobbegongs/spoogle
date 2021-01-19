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

function Filters(props) {
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


export default Filters;
