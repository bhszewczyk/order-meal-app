import React from 'react';

import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

function MealItemForm(props) {
	return (
		<form className={styles.form}>
			<Input
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
		</form>
	);
}

export default MealItemForm;
