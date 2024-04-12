import React from "react";
import styles from "./index.module.css";
import { toast } from "react-hot-toast";
import { useCartContext } from "../../providers/CartProvider/CartProvider";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseUrl } from "../../constants/constants";

const Dropdown = ({ showDropdown }) => {
  const { setUser } = useUser();
  const { cartItems, onRemoveAll } = useCartContext();
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  const handleLogout = async () => {
    const cartItemsPromises = cartItems.map((item) => {
      return fetch(`${baseUrl}/cart-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
        }),
      });
    });

    try {
      await Promise.all(cartItemsPromises);
      onRemoveAll();
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }

    setUser(null);
    navigate("/");
    cookies.remove("token");
    cookies.remove("username");
    toast.success("Logged out successfully");
  };

  return (
    <div
      style={showDropdown ? { display: "flex" } : {}}
      className={styles["user-dropdown"]}
    >
      <button
        className={styles["button-auth"]}
        onClick={() => navigate("/products")}
      >
        Products
      </button>
      <button
        className={styles["button-auth"]}
        onClick={() => navigate("/wishlist")}
      >
        Wishlist
      </button>
      <button
        className={styles["button-auth"]}
        onClick={() => navigate("/orders")}
      >
        Orders
      </button>
      <button className={styles["button-auth"]} onClick={handleLogout}>
        Sign out
      </button>
    </div>
  );
};

export default Dropdown;
