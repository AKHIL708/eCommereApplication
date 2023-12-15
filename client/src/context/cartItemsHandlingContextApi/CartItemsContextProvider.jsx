import { useEffect, useState } from "react";
import CartItemsContext from "./CartItemsContext";

const CartItemsContextProvider = ({ children }) => {
  const [totalCartItems, setTotalCartItems] = useState([]);
  return (
    <>
      <CartItemsContext.Provider value={{ totalCartItems, setTotalCartItems }}>
        {children}
      </CartItemsContext.Provider>
    </>
  );
};

export default CartItemsContextProvider;
