import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = ({ createStream }) => {
	const onSubmit = (formValues) => {
		createStream(formValues);
	};
	return (
		<div className="container mt-5">
			<h1>Create Stream</h1>
			<StreamForm onSubmit={onSubmit} />;
		</div>
	);
};

export default connect(null, { createStream })(StreamCreate);
