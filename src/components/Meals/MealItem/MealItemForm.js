import React, { useRef, useState } from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

function MealItemForm(props) {
	const [amountIsValid, setAmountIsValid] = useState(true);

	const amountInputRef = useRef();

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNum = +enteredAmount;

		if (
			enteredAmount.trim().length === 0 ||
			enteredAmountNum < 1 ||
			enteredAmountNum > 9
		) {
			setAmountIsValid(false);
			return;
		}

		props.onAddToCart(enteredAmountNum);
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label='Amount'
				input={{
					id: 'amount_' + props.id,
					type: 'number',
					min: '1',
					max: '9',
					step: '1',
					defaultValue: '1',
				}}
			/>
			<Button value='Add' />
			{!amountIsValid && <p>Please enter a valid amount! (1-9)</p>}
		</form>
	);
}

export default MealItemForm;
