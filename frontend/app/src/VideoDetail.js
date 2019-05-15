import React from 'react';
import Youtube from 'react-youtube';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


// react-youtube docs: https://www.npmjs.com/package/react-youtube

// ~ when to play?


function VideoDetail(props) {
	// props:
	// ~ videoId 
	return (
		<div>
			<div>
				<Youtube
					videoId = {props.videoId}
					opts = {{
						height: '180',
						width: '320',
						playerVars: {
							autoplay: 0
						}
					}}
				/>
			</div>
		</div>
	);
}

export default VideoDetail;
