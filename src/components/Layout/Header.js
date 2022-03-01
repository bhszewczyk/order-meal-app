import React from 'react';

import styles from './Header.module.css';
import headerImg from '../../assets/meals.jpg';

import HeaderCartBtn from './HeaderCartBtn';

function Header(props) {
	return (
		<React.Fragment>
			<header className={styles.header}>
				<h1>Meals</h1>
				<HeaderCartBtn onClick={props.onEnableCart} />
			</header>
			<div className={styles['main-image']}>
				<img src={headerImg} alt='A table full of delicious food.' />
			</div>
		</React.Fragment>
	);
}

export default Header;
