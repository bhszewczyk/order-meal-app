import React, { useContext, useState } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {
	const [isOrderingMode, setIsOrderingMode] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};
	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItems = (
		<ul className={styles['cart-items']}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onAdd={cartItemAddHandler.bind(null, item)}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
				/>
			))}
		</ul>
	);

	const orderHandler = () => {
		setIsOrderingMode(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);

		try {
			const response = await fetch(
				'https://meals-app-de3c1-default-rtdb.firebaseio.com/orders.json',
				{
					method: 'POST',
					body: JSON.stringify({
						user: userData,
						orderedItems: cartCtx.items,
					}),
				}
			);
		} catch (error) {
			throw new Error('Order submition failed');
		}

		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const modalActionsBtn = (
		<div className={styles.actions}>
			<button className={styles['button--alt']} onClick={props.onDisableCart}>
				Close
			</button>
			{hasItems && (
				<button className={styles.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isOrderingMode && (
				<Checkout
					onCancel={props.onDisableCart}
					onSubmit={submitOrderHandler}
				/>
			)}
			{!isOrderingMode && modalActionsBtn}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>Ordering meals...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Roger Roger, we are preparing your meal!</p>
			<div className={styles.actions}>
				<button className={styles['button']} onClick={props.onDisableCart}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClick={props.onDisableCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
}

export default Cart;
