import { createContext, useState, useContext } from "react";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (food) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === food.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prevItems, { ...food, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prevItem) => {
      return prevItem.filter((item) => item.id !== id);
    });
  };
  const updateQuantity = (id, action) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + action) }
          : item,
      );
    });
  };
  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
