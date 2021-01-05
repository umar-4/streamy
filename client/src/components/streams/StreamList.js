import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
	useEffect(
		() => {
			fetchStreams();
		},
		[ fetchStreams ]
	);
	const renderCreateBtn = () => {
		if (isSignedIn) {
			return (
				<Link to="/streams/new" className="btn btn-primary" style={{ float: 'right', marginTop: '.8rem' }}>
					Create Stream
				</Link>
			);
		}
	};
	const renderAdmin = (stream) => {
		if (currentUserId === stream.userId) {
			return (
				<div className="col-md-2 py-4">
					<Link to={`/streams/edit/${stream.id}`} className="btn btn-primary mx-1">
						Edit
					</Link>
					<button className="btn btn-danger">Delete</button>
				</div>
			);
		}
	};
	const renderList = () => {
		return streams.map((stream) => {
			return (
				<div className="card mb-2" key={stream.id}>
					<div className="row g-0">
						<div className="col-md-1">
							<i className="fas fa-camera py-3 px-3" style={{ fontSize: '3.3rem', color: '#dc3545' }} />
						</div>
						<div className="col-md-9">
							<div className="card-body">
								<h5 className="card-title">{stream.title}</h5>
								<p className="card-text">{stream.description}</p>
							</div>
						</div>
						{renderAdmin(stream)}
					</div>
				</div>
			);
		});
	};
	return (
		<div className="container m-5">
			<h1 className="d-inline-block my-2">Streams</h1>
			{renderCreateBtn()}
			{renderList()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	};
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
