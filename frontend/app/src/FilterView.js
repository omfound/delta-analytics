import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

function MultipleSelect() {
  // const classes = useStyles();
  // const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  function handleChange(event) {
    setPersonName(event.target.value);
  }
  
  return (
    <div className='{classes.root}'>
      <FormControl className='{classes.formControl}'>
        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className='{classes.chips}'>
              {selected.map(value => (
                <Chip key={value} label={value} className='{classes.chip}' />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
      
    </div>
  );
}


// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

function DatePickers(props) {
  // const classes = useStyles();

  return (
    <form className='{classes.container}' noValidate>
      <TextField
        id="date"
        label={props.label}
        type="date"
        defaultValue={props.defaultValue}
        className='{classes.textField}'
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

function TextFields() {

	const [values, setValues] = React.useState([]);

	const handleChange = event => {
    	setValues(event.target.value);
  	};

  return (
  	<form className='{classes.container}' noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Keyword"
        className='{classes.textField}'
        value={values}
        onChange={handleChange}
        margin="normal"
      />
    </form>
  );
}


function FilterView(props) {

    const newDate = new Date();
    const date = String(newDate.getDate()).padStart(2,'0');
    const month = String(newDate.getMonth() + 1).padStart(2,'0');
    const startYear = String(newDate.getFullYear() - 1);
    const endYear = String(newDate.getFullYear());
    const startDateString = `${startYear}-${month}-${date}`;
    const endDateString = `${endYear}-${month}-${date}`; 

    return (
      <div className="FilterView">
          <div className="FilterHeading">
            <Typography variant="h3">Filters</Typography>
          </div>
          <div className="FilterContainer">

            <MultipleSelect />
            <div> 
              <Typography variant="h4">Start Date</Typography>
              <DatePickers label = "Start Date" defaultValue = {startDateString}/>
            </div>
            <div> 
              <Typography variant="h4">End Date</Typography>
              <DatePickers label = "End Date" defaultValue = {endDateString}/>
            </div>
            <div> 
              <Typography variant="h4">Keywords</Typography>
              <TextFields />
            </div>
            <div>
              <Typography variant="h4">Search</Typography>
              <Button color="primary" onClick={() => {alert("Click!")}}>
              Search
              </Button>
            </div>

          </div>
      </div>
    );
}


// class FilterView extends React.Component {

// 	constructor(props) {
//   	super(props);
  		
// 		this.startDateString = `${startYear}-${month}-${date}`;
// 		this.endDateString = `${endYear}-${month}-${date}`;	
//   	}

// 	render() {
// 		return (
// 			<div className="FilterView">
// 					<div className="FilterHeading">
// 					 	<Typography variant="h3">Filters</Typography>
// 					</div>
// 					<div className="FilterContainer">

// 						<MultipleSelect />
// 						<div> 
// 							<Typography variant="h4">Start Date</Typography>
// 							<DatePickers label = "Start Date" defaultValue = {this.startDateString}/>
// 						</div>
// 						<div> 
// 							<Typography variant="h4">End Date</Typography>
// 							<DatePickers label = "End Date" defaultValue = {this.endDateString}/>
// 						</div>
// 						<div> 
// 							<Typography variant="h4">Keywords</Typography>
// 							<TextFields />
// 						</div>
// 						<div>
// 							<Typography variant="h4">Search</Typography>
// 							<Button color="primary" onClick={() => {alert("Click!")}}>
// 							Search
// 							</Button>
// 						</div>

// 					</div>
// 			</div>
// 		)
// 	}
// }



export default FilterView;