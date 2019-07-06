import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ResponsivePie} from '@nivo/pie'

import { GavelRounded, RecordVoiceOver } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
	analyticsContainer: {
	    height: '100vh'
	},
	analyticsHeading: {
    	alignItems: 'center'
  	},
  	metricsContainer: {
  		display: 'flex',
  		flexDirection: 'row',
  		justifyContent: 'space-around',
  		paddingTop: theme.spacing(3),
  		paddingBottom: theme.spacing(3)
  	},
  	metric: {
  		display: 'flex',
  		flexDirection: 'row',
  		alignItems: 'flex-start',
  		padding: theme.spacing(1)
  	},
  	metricData: {
  		paddingLeft: theme.spacing(2),
  		display: 'flex',
  		flexDirection: 'column'
  	},
  	icon: {
  		paddingTop: theme.spacing(1),
  		fontSize: 32
  	}
}));


function AnalyticsView(props) {

	const classes = useStyles();

	return(
		<div className={classes.analyticsContainer}>
			<div className={classes.analyticsHeading}>
			 	<Typography variant="h4">Analytics</Typography>
			</div>
			<div className={classes.metricsContainer}>
				<div className={classes.metric}>
					<GavelRounded className={classes.icon}/> 
					<div className={classes.metricData}>
						{/*Replace with prop*/}
						<Typography variant="h5">1000</Typography>
						<Typography variant="caption">Metric explanation 1</Typography>
					</div>
				</div>
				<div className={classes.metric}>
					<RecordVoiceOver className={classes.icon}/>
					<div className={classes.metricData}>
						{/*Replace with prop*/}
						<Typography variant="h5">1234</Typography>
						<Typography variant="caption">Metric explanation 2</Typography>
					</div>
				</div>
			</div>


			<div className="ChartContainer">
				<ResponsivePie
			        data={props.data}
			        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			        innerRadius={0.5}
			        padAngle={0.7}
			        cornerRadius={3}
			        colors={{ scheme: 'set1' }}
			        borderWidth={1}
			        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
			        radialLabel='label'
			        radialLabelsSkipAngle={10}
			        radialLabelsTextXOffset={6}
			        radialLabelsTextColor="#333333"
			        radialLabelsLinkOffset={0}
			        radialLabelsLinkDiagonalLength={16}
			        radialLabelsLinkHorizontalLength={24}
			        radialLabelsLinkStrokeWidth={1}
			        radialLabelsLinkColor={{ from: 'color' }}
			        slicesLabelsSkipAngle={10}
			        slicesLabelsTextColor="#333333"
			        animate={true}
			        motionStiffness={90}
			        motionDamping={15}
			    />
			</div>
		</div>
		
	);

}

export default AnalyticsView;