import React from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';

function Cart(props) {
	const cartItems = (
		<ul className={styles['cart-items']}>
			{[{ id: 'c1', name: 'Hosomaki', amount: 2, price: 24.99 }].map((item) => (
				<li key={item.id}>{item.name}</li>
			))}
		</ul>
	);

	return (
		<Modal onClick={props.onDisableCart}>
			{cartItems}
			<div className='styles.total'>
				<span>Total Amount</span>
				<span>$$$</span>
			</div>
			<div className={styles.actions}>
				<button className={styles['button--alt']} onClick={props.onDisableCart}>
					Close
				</button>
				<button className={styles.button}>Order</button>
			</div>
		</Modal>
	);
}

export default Cart;
