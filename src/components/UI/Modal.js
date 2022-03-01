import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const portalId = document.getElementById('overlays');

function Backdrop(props) {
	return <div className={styles.backdrop} onClick={props.onClick}></div>;
}

function ModalOverlay(props) {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
}

function Modal(props) {
	return (
		<React.Fragment>
			{ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalId)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalId
			)}
		</React.Fragment>
	);
}

export default Modal;
