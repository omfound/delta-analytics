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


const COLORS = [
	"#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", 
	"#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", 
	"#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", 
	"#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", 
	"#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", 
	"#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", 
	"#5776a9", "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", 
	"#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", 
	"#678275", "#c5a121", "#a978ba", "#ee534e", "#d24506", "#59c3fa", 
	"#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", 
	"#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf", "#d77cd1", 
	"#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", 
	"#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", 
	"#bb59d8", "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", 
	"#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0", 
	"#20c773", "#8b696d", "#78762d", "#e154c6", "#40835f", "#d73656", 
	"#1afd5c", "#c4f546", "#3d88d8", "#bd3896", "#1397a3", "#f940a5", 
	"#66aeff", "#d097e7", "#fe6ef9", "#d86507", "#8b900a", "#d47270", 
	"#e8ac48", "#cf7c97", "#cebb11", "#718a90", "#e78139", "#ff7463", 
	"#bea1fd"
]

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

function sumProperty(arr, type) {
	return arr.reduce((total, obj) => {
		if (typeof obj[type] === 'string') {
			return total + Number(obj[type]);
		}
		return total + obj[type]
	}, 0);
}

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

function MinutesPerTopic(props) {
	console.log(props.sessionAnalytics)
	return (
		<ResponsiveContainer>
			<PieChart>
		        <Pie
		          data={props.sessionAnalytics}
		          cx={'50%'}
		          cy={'50%'}
		          innerRadius={'60%'}
		          outerRadius={'80%'}
		          fill="#8884d8"
		          paddingAngle={5}
		          dataKey="total_minutes_per_topic"
		          nameKey="display_topic_name"
		        >
		          {
		            props.sessionAnalytics.map((entry) => <Cell key={`cell-${entry['true_topic_id']}`} fill={COLORS[entry['true_topic_id'] % COLORS.length]} />)
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
						<Typography variant="h5">
							{sumProperty(props.state.sessionAnalytics, 'session_count')}
						</Typography>
						<Typography variant="caption">Sessions</Typography>
					</div>
				</div>
				<div className={classes.metric}>
					<RecordVoiceOver className={classes.icon}/>
					<div className={classes.metricData}>
						{/*Replace with prop*/}
						<Typography variant="h5">
							{sumProperty(props.state.sessionAnalytics, 'total_minutes_per_topic')}
						</Typography>
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
				<MinutesPerTopic sessionAnalytics={props.state.sessionAnalytics}/>
			</div>
		</div>
		
	);

}

export default AnalyticsView;