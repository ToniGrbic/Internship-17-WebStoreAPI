import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({
  user: null,
  wishlist: [],
  orders: [],
  setUser: () => {},
  isOnWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  addToOrders: () => {},
  setOrders: () => {},
  setWishlist: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
  };

  return (
    <Context.Provider
      value={{
        user,
        wishlist,
        orders,
        setUser,
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
