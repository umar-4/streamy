import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

const StreamShow = ({ stream, fetchStream, match }) => {
	const { id } = match.params;
	const videoRef = useRef();
	useEffect(
		() => {
			fetchStream(id);
			const flvPlayer = flv.createPlayer({
				type: 'flv',
				url: `http://localhost:8000/live/${id}.flv`
			});
			flvPlayer.attachMediaElement(videoRef.current);
			flvPlayer.load();
			return () => {
				flvPlayer.destroy();
			};
		},
		[ fetchStream, id ]
	);

	if (!stream) {
		return (
			<div>
				<video ref={videoRef} style={{ width: '100%' }} controls />
				<h1>...loading</h1>
			</div>
		);
	}
	return (
		<div>
			<video ref={videoRef} style={{ width: '100%' }} controls />
			<h1>{stream.title}</h1>
			<p>{stream.description}</p>
		</div>
	);
};

const mapStateToProps = (state, { match }) => {
	return {
		stream: state.streams[match.params.id]
	};
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
