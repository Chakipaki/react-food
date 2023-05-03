import React, { useRef, useState } from "react";

import styles from "./Checkout.module.css";

const isEmpty = value => value.trim() === '';
const isNotEqualChart = (value, amount) => {
    return value.trim().length !== amount;
}

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    const nameInput = useRef();
    const streetInput = useRef();
    const postalCodeInput = useRef();
    const cityInput = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPostalCode = postalCodeInput.current.value;
        const enteredCity = cityInput.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isNotEqualChart(enteredPostalCode, 5);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid;

        if (!formIsValid) {
            return;
        }

        props.onSubmit({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    }

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${formInputValidity.name ? '' : styles.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInput} />
                {!formInputValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.street ? '' : styles.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInput} />
                {!formInputValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.postalCode ? '' : styles.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" ref={postalCodeInput} />
                {!formInputValidity.postalCode && <p>Please enter a valid postal code(5 char long)!</p>}
            </div>
            <div className={`${styles.control} ${formInputValidity.city ? '' : styles.invalid}`}>
                <label htmlFor="postal">City</label>
                <input type="text" id="city" ref={cityInput} />
                {!formInputValidity.city && <p>Please enter a valid city!</p>}
            </div>

            <div className={styles.actions}>
                <button onClick={props.onClose}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout;
