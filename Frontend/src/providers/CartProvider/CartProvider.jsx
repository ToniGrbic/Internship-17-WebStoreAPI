import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  changeQty: () => {},
  addToCart: () => {},
  toggleCartItemQty: () => {},
  onRemove: () => {},
  setShowCart: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
});

const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const addToCart = (product, quantity) => {
    const ProductInCart = cartItems.find((item) => item.id === product.id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);

    if (ProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id)
          return { ...item, quantity: item.quantity + quantity };
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...product, quantity };
      setCartItems([...cartItems, newItem]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const toggleCartItemQty = (id, type) => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    let newCartItems = cartItems.filter((item) => item.id !== id);

    if (type === "inc") {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
      setCartItems([
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index),
      ]);
    }

    if (type === "dec" && foundProduct.quantity > 1) {
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
      setCartItems([
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ...newCartItems.slice(index),
      ]);
    }
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.quantity);
  };

  const changeQty = (type) => {
    if (type === "dec") {
      qty >= 2 && setQty((prev) => prev - 1);
    }
    if (type === "inc") {
      setQty((prev) => prev + 1);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        changeQty,
        addToCart,
        toggleCartItemQty,
        onRemove,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  return useContext(Context);
};

export { CartProvider };
