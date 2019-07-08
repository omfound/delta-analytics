import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  BarChart, Bar, Cell, XAxis,
  YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, ResponsiveContainer
} from 'recharts';


import { GavelRounded, RecordVoiceOver } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


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
  	},
  	minutesPerTopicByTime: {
  		height: 240,
  		paddingTop: theme.spacing(2),
  		paddingBottom: theme.spacing(6)
  	},
  	minutesPerTopic: {
  		height: 240,
  		paddingTop: theme.spacing(2),
  		paddingBottom: theme.spacing(2)
  	}
}));

function MinutesPerTopicByTime() {
	return (
		<ResponsiveContainer>
	      <BarChart
	        data={data}
	        margin={{
	          top: 10, right: 10, left: 10, bottom: 0,
	        }}
	      >
	        <CartesianGrid strokeDasharray="3 3" />
	        <XAxis dataKey="name" />
	        <YAxis />
	        <Tooltip />
	        <Legend />
	        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
	        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
	      </BarChart>
	    </ResponsiveContainer>
    );
}

function MinutesPerTopic() {
	return (
		<ResponsiveContainer>
			<PieChart>
		        <Pie
		          data={data2}
		          cx={'50%'}
		          cy={'50%'}
		          innerRadius={'60%'}
		          outerRadius={'80%'}
		          fill="#8884d8"
		          paddingAngle={5}
		          dataKey="value"
		        >
		          {
		            data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
		          }
		        </Pie>
		        <Legend layout='vertical' align='right' verticalAlign='middle' />
		  	</PieChart>
		 </ResponsiveContainer>
	);
}



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
						<Typography variant="caption">Sessions</Typography>
					</div>
				</div>
				<div className={classes.metric}>
					<RecordVoiceOver className={classes.icon}/>
					<div className={classes.metricData}>
						{/*Replace with prop*/}
						<Typography variant="h5">1234</Typography>
						<Typography variant="caption">Minutes of Conversation</Typography>
					</div>
				</div>
			</div>
			<div className={classes.minutesPerTopicByTime}>
				<Typography variant="h6">Minutes Per Topic Over Time</Typography>
				<MinutesPerTopicByTime />
			</div>
			<div className={classes.minutesPerTopic}>
				<Typography variant="h6">Minutes Per Topic</Typography>
				<MinutesPerTopic />
			</div>
		</div>
		
	);

}

export default AnalyticsView;