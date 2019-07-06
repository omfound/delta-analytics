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


const useStyles = makeStyles(theme => ({
  filterContainer: {
    height: '100vh'
  },
  filterHeading: {
    alignItems: 'center'
  },
  topicsHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(3)
  },
  topicsPicker: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    flexWrap: "wrap",
    paddingBottom: theme.spacing(3)
  },
  chips: {
    display:'flex',
    flexWrap: 'wrap'
  },
  chip: {},
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2)
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(3),
    fullWidth: true
  },
  datePickerElement: {
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  keywordHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(3)
  },
  keywordPicker: {
    margin: 0,
    fullWidth: true,
    display: "flex",
    wrap: "nowrap",
    paddingBottom: theme.spacing(3)
  },
  buttonContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchButton: {
    fontSize: '25px'
  }
}));



function MultipleSelect() {
  
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  function handleChange(event) {
    setPersonName(event.target.value);
  }
  
  return (
    <div>
      <FormControl className={classes.topicsPicker}>
        <InputLabel htmlFor="select-multiple-chip">Select topics!</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
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

function DatePickers(props) {
  const classes = useStyles();

  return (
    <form noValidate className={classes.datePickerElement}>
      <TextField
        id="date"
        label={props.label}
        type="date"
        defaultValue={props.defaultValue}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

function TextFields() {

  const classes = useStyles();
	const [values, setValues] = React.useState([]);

	const handleChange = event => {
    	setValues(event.target.value);
  	};

  return (
  	<form noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label=""
        className={classes.keywordPicker}
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

    const classes = useStyles();

    return (
      <div className={classes.filterContainer}>
          <div className={classes.filterHeading}>
            <Typography variant="h4">Filters</Typography>
          </div>
          <div className={classes.topicsHeader}>
            <Typography variant="h5">Topics</Typography>
          </div>
          <MultipleSelect /> {/* Form class is set inside this component */}
          <div className={classes.dateHeader}> 
            <Typography variant="h5">Date Range</Typography>
          </div>
          <div className={classes.datePicker}>
            {/* Form class is set inside these components */}
            <DatePickers className={classes.datePickerElement} label="Start Date" defaultValue={startDateString}/>
            <DatePickers className={classes.datePickerElement} label="End Date" defaultValue={endDateString}/>
          </div> 
          <div className={classes.keywordHeader}> 
            <Typography variant="h5">Keywords</Typography>
          </div>
          <TextFields /> {/* Form class is set inside this component */}
          <div className={classes.buttonContainer}>
            <Button 
              onClick={() => {alert("Click!")}}
              className={classes.searchButton}
              fullWidth
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </div>
      </div>
    );
}


export default FilterView;