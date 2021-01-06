import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

const StreamDelete = ({ stream, match, fetchStream, deleteStream }) => {
	const { id } = match.params;
	useEffect(
		() => {
			fetchStream(id);
		},
		[ fetchStream, id ]
	);
	const renderedBtns = (
		// <></> =React.Fragments
		<Fragment>
			<Link to="/" type="button" className="btn btn-primary" data-bs-dismiss="modal">
				Cancel
			</Link>
			<button type="button" className="btn btn-danger" onClick={() => deleteStream(id)}>
				Delete
			</button>
		</Fragment>
	);
	const renderMsg = () => {
		if (!stream) {
			return 'Are you sure you want to delete it?';
		} else {
			return `Are you sure you want to delete "${stream.title}"?`;
		}
	};
	return <Modal title="DELETE STREAM" msg={renderMsg} buttons={renderedBtns} onDismiss={() => history.push('/')} />;
};

const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	return { stream: state.streams[id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
