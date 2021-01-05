import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = ({ fetchStream, editStream, match, stream }) => {
	const selectedId = match.params.id;
	useEffect(
		() => {
			fetchStream(selectedId);
		},
		[ fetchStream, selectedId ]
	);

	const onSubmit = (formValues) => {
		console.log(selectedId);
		editStream(selectedId, formValues);
	};
	if (!stream) {
		return <div>Loading!!</div>;
	}
	return (
		<div className="container mt-5">
			<h1>Edit Stream</h1>
			<StreamForm initialValues={_.pick(stream, 'title', 'description')} onSubmit={onSubmit} />;
		</div>
	);
};
// ownProps are the same as props passed into the component
const mapStateToProps = (state, ownProps) => {
	const { id } = ownProps.match.params;
	return { stream: state.streams[id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
