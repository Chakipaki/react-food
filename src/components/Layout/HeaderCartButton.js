import React, { useContext, useEffect, useState } from "react";

import styles from "./HeaderCartComponent.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsBumped, setBtnIsBumped] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((currNum, item) => currNum + item.amount, 0);

    const btnClasses = `${styles.button} ${btnIsBumped ? styles.bump: ''}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }

        setBtnIsBumped(true);

        const timer = setTimeout(() => {
            setBtnIsBumped(false);
        })

        return () => {
            clearTimeout(timer);
        }
    }, [cartCtx.items]);

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={styles.icon}>
                <CartIcon />
            </span>

            <span>Your cart</span>

            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;
