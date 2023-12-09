import React, { useState } from "react";
import CartItemsContext from "./CartItemsContext";

const CartItemsContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
        {children}
      </CartItemsContext.Provider>
    </>
  );
};

export default CartItemsContextProvider;
