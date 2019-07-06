import React from 'react';
import {ResponsivePie} from '@nivo/pie'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


function AnalyticsView(props) {
	return(
		<div className="AnalyticsView">
			<div className="AnalyticsHeading">
			 	<Typography variant="h3">Analytics</Typography>
			</div>
			<div className="MetricsContainer">
				<div className="Metrics1">
					<Typography variant="h5">100</Typography>
				</div>
				<div className="Metrics2">
					<Typography variant="h5">200</Typography>
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


// class AnalyticsView extends React.Component {

// 	constructor(props) {
// 		super(props);
// 		console.log(this.data)
// 	}

// 	render() {
// 		return(
// 			<div className="AnalyticsView">
// 				<Paper elevation={1}>
// 					<div className="AnalyticsHeading">
// 					 	<Typography variant="h3">Analytics</Typography>
// 					</div>
// 					<div className="MetricsContainer">
// 						<div className="Metrics1">
// 							<Typography variant="h5">100</Typography>
// 						</div>
// 						<div className="Metrics2">
// 							<Typography variant="h5">200</Typography>
// 						</div>
// 					</div>
// 					<div className="ChartContainer">
// 						<ResponsivePie
// 					        data={this.props.data}
// 					        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
// 					        innerRadius={0.5}
// 					        padAngle={0.7}
// 					        cornerRadius={3}
// 					        colors={{ scheme: 'set1' }}
// 					        borderWidth={1}
// 					        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
// 					        radialLabel='label'
// 					        radialLabelsSkipAngle={10}
// 					        radialLabelsTextXOffset={6}
// 					        radialLabelsTextColor="#333333"
// 					        radialLabelsLinkOffset={0}
// 					        radialLabelsLinkDiagonalLength={16}
// 					        radialLabelsLinkHorizontalLength={24}
// 					        radialLabelsLinkStrokeWidth={1}
// 					        radialLabelsLinkColor={{ from: 'color' }}
// 					        slicesLabelsSkipAngle={10}
// 					        slicesLabelsTextColor="#333333"
// 					        animate={true}
// 					        motionStiffness={90}
// 					        motionDamping={15}
// 					    />
// 					</div>
// 				</Paper>
// 			</div>
			
// 		);
// 	}
// }

export default AnalyticsView;