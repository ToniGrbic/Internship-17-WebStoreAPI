import React from "react";
import styles from "./index.module.css";
import { toast } from "react-hot-toast";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ showDropdown }) => {
  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();

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
      <button
        className={styles["button-auth"]}
        onClick={() => {
          setIsLoggedIn(false);
          navigate("/");
          toast.success("Logged out successfully");
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Dropdown;
