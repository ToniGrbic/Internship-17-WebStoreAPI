import React from "react";
import styles from "./index.module.css";
import { toast } from "react-hot-toast";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Dropdown = ({ showDropdown }) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const cookies = new Cookies(null, { path: "/" });

  const handleLogout = async () => {
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
