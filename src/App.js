import React, {useState} from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
    const [cartIsShow, setCartIsShow] = useState(false);

    const showCartHandler = () => {
        setCartIsShow(true);
    };

    const hideCartHandler =  () => {
        setCartIsShow(false);
    };

    return (
        <CartProvider>
            <Header onShowCart={showCartHandler} />

            <main>
                <Meals />
            </main>

            {cartIsShow && <Cart onClose={hideCartHandler} />}
        </CartProvider>
    );
}

export default App;
