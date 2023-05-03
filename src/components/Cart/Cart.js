import React, { useContext, useState } from "react";

import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-1-a181a-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        cartCtx.clean();
    }

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(item => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>;

    const orderHandler = (e) => {
        setIsCheckout(true);
    }

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmit={submitOrderHandler} onClose={props.onClose} />}
            {!isCheckout && modalActions}
        </React.Fragment>
    )

    const isSubmittingModalContent = (
        <p>Sending order data...</p>
    )

    const isSubmittedModalContent = (
        <p>Success send order...</p>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !isSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && isSubmitted && isSubmittedModalContent}
        </Modal>
    )
}

export default Cart;
