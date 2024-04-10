import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({
  user: null,
  isLoggedIn: false,
  wishlist: [],
  orders: [],
  setUser: () => {},
  setIsLoggedIn: () => {},
  isOnWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  addToOrders: () => {},
  setOrders: () => {},
  setWishlist: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  const isOnWishlist = (id) => {
    return wishlist?.some((item) => item.id === id);
  };

  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
    toast.success(`${product.title} added to wishlist`);
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== id);
    setWishlist(updatedWishlist);
    toast.success("Removed from wishlist");
  };

  const addToOrders = (cartItems) => {
    setOrders([
      ...orders,
      ...cartItems.map((cartItem) => {
        return { ...cartItem, status: "PENDING" };
      }),
    ]);
    toast.success(`products bought successfully!`);
  };

  return (
    <Context.Provider
      value={{
        user,
        isLoggedIn,
        wishlist,
        orders,
        setUser,
        setIsLoggedIn,
        isOnWishlist,
        removeFromWishlist,
        addToWishlist,
        addToOrders,
        setOrders,
        setWishlist,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useUser = () => {
  return useContext(Context);
};

export { UserProvider };
