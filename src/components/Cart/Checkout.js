import React, { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const hasFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postcode: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postcodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmOrderHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostcode = postcodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		console.log(enteredName);

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostcodeIsValid = hasFiveChars(enteredPostcode);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postcode: enteredPostcodeIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostcodeIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}

		props.onSubmit({
			name: enteredName,
			street: enteredStreet,
			city: enteredCity,
			postcode: enteredPostcode,
		});
	};

	return (
		<form className={styles.form} onSubmit={confirmOrderHandler}>
			<div
				className={`${styles.control} ${
					formInputsValidity.name ? '' : styles.invalid
				}`}
			>
				<label htmlFor='name'>Your Name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formInputsValidity.name && <p>Please enter a valid name</p>}
			</div>
			<div
				className={`${styles.control} ${
					formInputsValidity.street ? '' : styles.invalid
				}`}
			>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef}></input>
				{!formInputsValidity.street && <p>Please enter a street name</p>}
			</div>
			<div
				className={`${styles.control} ${
					formInputsValidity.postcode ? '' : styles.invalid
				}`}
			>
				<label htmlFor='postcode'>Postal Code</label>
				<input type='text' id='postcode' ref={postcodeInputRef}></input>
				{!formInputsValidity.postcode && (
					<p>Please enter a valid postal code</p>
				)}
			</div>
			<div
				className={`${styles.control} ${
					formInputsValidity.city ? '' : styles.invalid
				}`}
			>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef}></input>
				{!formInputsValidity.city && <p>Please enter a valid city</p>}
			</div>
			<div className={styles.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Order</button>
			</div>
		</form>
	);
};

export default Checkout;
