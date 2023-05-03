import React, {useEffect, useState} from "react";

import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const AvailableMeals = props => {
    const [meal, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://react-http-1-a181a-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('Something wrong');
            }
            const data = await response.json();
            setMeals(data);
            setIsLoading(false);
        }

        fetchMeals().catch(e => {
            setIsLoading(false);
            setHttpError(e.message)
        });
    }, []);

    if (isLoading) {
        return (
            <section className={styles.mealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={styles.mealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    const mealList = meal.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            price={+meal.price}
            description={meal.description}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;
