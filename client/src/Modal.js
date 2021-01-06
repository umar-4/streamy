import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
	return ReactDOM.createPortal(
		<div className="modal d-block" tabIndex="-1" onClick={props.onDismiss}>
			<div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{props.title}</h5>
					</div>
					<div className="modal-body">
						<p>{props.msg()}</p>
					</div>
					<div className="modal-footer">{props.buttons}</div>
				</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
