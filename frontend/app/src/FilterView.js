import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class FilterView extends React.Component {
	render() {
		return (
			<div className="FilterView">
				<Paper elevation={1}>
					<div className="FilterHeading">
					 	<Typography variant="h3">Filters</Typography>
					</div>
					<div className="FilterContainer">
					</div>
				</Paper>
			</div>
		)
	}
}

// var newDate = new Date();
// var date = String(newDate.getDate()).padStart(2,'0');
// var month = String(newDate.getMonth() + 1).padStart(2,'0');
// var year = String(newDate.getFullYear());
// var dateString = `${year}-${month}-${date}`

export default FilterView;