import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
// whenever you want to update redux state we always call action creators.
class GoogleAuth extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			window.gapi.load('auth2', () => {
				window.gapi.auth2
					.init({
						client_id: '6360491789-lsnv0291q92mfks7q7lh780438bm6it0.apps.googleusercontent.com',
						scope: 'email'
					})
					.then(() => {
						this.auth = window.gapi.auth2.getAuthInstance();
						this.onAuthChange(this.auth.isSignedIn.get());
						this.auth.isSignedIn.listen(this.onAuthChange);
					});
			});
		}, 20);
	}
	onAuthChange = (isSignedIn) => {
		isSignedIn ? this.props.signIn() : this.props.signOut();
	};
	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
	};
	renderAuthButton = () => {
		switch (this.props.isSignedIn) {
			case false:
				return (
					<button className="btn btn-danger" onClick={this.onSignInClick}>
						SignIn
					</button>
				);
			case true:
				return (
					<button className="btn btn-danger" onClick={this.onSignOutClick}>
						SignOut
					</button>
				);
			default:
				return <span>Don't know</span>;
		}
	};
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}
const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
