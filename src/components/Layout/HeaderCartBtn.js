import React, { useContext } from 'react';

import styles from './HeaderCartBtn.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

function HeaderCartBtn(props) {
	const cartCtx = useContext(CartContext);

	const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
		return curNum + item.amount;
	}, 0);

	return (
		<button className={styles.button} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.count}>{numberOfCartItems}</span>
		</button>
	);
}

export default HeaderCartBtn;
