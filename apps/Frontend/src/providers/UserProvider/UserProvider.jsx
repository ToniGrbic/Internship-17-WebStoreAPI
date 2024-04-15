import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../constants/constants";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";

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
  const cookies = new Cookies();
  const token = cookies.get("token");

  const isOnWishlist = (id) => {
    return wishlist?.some((item) => item.product.id === id);
  };

  const addToWishlist = async (product) => {
    if (!token) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/wishlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Something went wrong, try again later!");
      }
      setWishlist([...wishlist, { id: data.id, product: { ...product } }]);
      toast.success(`${product.title} added to wishlist`);
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  };

  const removeFromWishlist = async (id) => {
    if (!token) {
      toast.error("Please login to remove from wishlist");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/wishlists/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Something went wrong, try again later!");
      }
      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedWishlist);
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
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
