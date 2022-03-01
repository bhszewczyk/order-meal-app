import React, { useContext, useEffect, useState } from 'react';

import styles from './HeaderCartBtn.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartBtn(props) {
	const [btnRefreshEnabled, setBtnRefreshEnabled] = useState(false);

	const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

	const numberOfCartItems = items.reduce((curNum, item) => {
		return curNum + item.amount;
	}, 0);

	const btnStyles = `${styles.button} ${btnRefreshEnabled ? styles.bump : ''}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnRefreshEnabled(true);

		const timer = setTimeout(() => {
			setBtnRefreshEnabled(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnStyles} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.count}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartBtn;
