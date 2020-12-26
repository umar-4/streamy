import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderInputError = ({ error, touched }) => {
	if (error && touched) {
		return <div className="alert alert-danger mt-3">{error}</div>;
	}
};
const renderInput = ({ input, label, meta }) => {
	const labelclass = `form-label ${meta.error && meta.touched ? 'text-danger' : ''}`;
	const inputClass = `form-control ${meta.error && meta.touched ? 'alert-danger' : ''}`;
	return (
		<div className="mb-2">
			<label className={labelclass}>{label}</label>
			<input className={inputClass} {...input} autoComplete="off" />
			{renderInputError(meta)}
		</div>
	);
};
// component starts
const StreamCreate = (props) => {
	const onSubmit = (formValues) => {
		console.log(formValues);
	};
	return (
		<form className="container mt-4" onSubmit={props.handleSubmit(onSubmit)}>
			<Field name="title" component={renderInput} label="Enter Title" />
			<Field name="description" component={renderInput} label="Enter Description" />
			<button className="btn btn-primary">Submit</button>
		</form>
	);
};

const validate = ({ title, description }) => {
	const error = {};
	if (!title) {
		error.title = 'You Must Enter A Title';
	}
	if (!description) {
		error.description = 'You Must Enter A Description';
	}

	return error;
};

export default reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);
