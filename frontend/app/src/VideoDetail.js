import React from 'react';
import Youtube from 'react-youtube';

// react-youtube docs: https://www.npmjs.com/package/react-youtube

// ~ when to play?
// ~ 


function VideoDetail({videoId}) {
	return (
		<div>
			<Youtube
				videoId = {videoId}
				opts = {{
					height: '180',
					width: '320',
					playerVars: {
						autoplay: 0
					}
				}}
			/>
		</div>
	);
}

export default VideoDetail;
