import React, { useEffect, useState } from 'react';

import styles from './MealsAvailable.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function MealsAvailable() {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://meals-app-de3c1-default-rtdb.firebaseio.com/Meals.json'
			);

			if (!response.ok) {
				throw new Error('Http request error');
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					details: responseData[key].description,
					price: responseData[key].price,
				});
			}

			setMeals(loadedMeals);
		};

		fetchMeals()
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
				setHttpError(error.message);
			});
	}, []);

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			details={meal.description}
			price={meal.price}
		/>
	));

	if (isLoading) {
		console.log('isLoading');
		return (
			<section className={styles['meals-loading']}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={styles['meals-error']}>
				<p>{httpError}</p>
			</section>
		);
	}

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
}

export default MealsAvailable;
