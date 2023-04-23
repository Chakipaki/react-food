import React from "react";

import styles from "./Header.module.css";
import mealImg from "../../assets/meals.png"
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return (
       <React.Fragment>
           <header className={styles.header}>
               <h1>React Meals</h1>

               <HeaderCartButton onShowCart={props.onShowCart} />
           </header>

           <div className={styles['main-image']}>
               <img src={mealImg} alt="Meal image"/>
           </div>
       </React.Fragment>
    )
}

export default Header;
