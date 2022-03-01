import React from 'react';

import styles from './Input.module.css';

function myInput(props, ref) {
	return (
		<div className={styles.input}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input}></input>
		</div>
	);
}

const Input = React.forwardRef(myInput);

export default Input;
