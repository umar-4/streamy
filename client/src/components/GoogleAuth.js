import React from 'react';

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };
	componentDidMount() {
		const { gapi } = window;
		gapi.load('auth2', () => {
			gapi.auth2
				.init({
					client_id: '6360491789-lsnv0291q92mfks7q7lh780438bm6it0.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};
	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
	};
	renderAuthButton = () => {
		switch (this.state.isSignedIn) {
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

export default GoogleAuth;
