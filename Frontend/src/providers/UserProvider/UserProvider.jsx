import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext({
  user: null,
  isLoggedIn: false,
  wishlist: [],
  setUser: () => {},
  setIsLoggedIn: () => {},
  setWishlist: () => {},
  isOnWishlist: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useState([]);

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

  return (
    <Context.Provider
      value={{
        user,
        isLoggedIn,
        wishlist,
        setUser,
        setIsLoggedIn,
        setWishlist,
        isOnWishlist,
        removeFromWishlist,
        addToWishlist,
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
