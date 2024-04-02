import React, { useState } from "react";
import styles from "./Navigation.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider/UserProvider";
import { useCartContext } from "../../../providers/CartProvider/CartProvider";
import { AiOutlineShopping } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import TextInput from "../../Inputs/TextInput";
import Cart from "../../Cart";

const Navigation = ({ setSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    navigate("/products");
  };

  const { isLoggedIn, setIsLoggedIn } = useUser();
  const { setShowCart, totalQuantities, showCart } = useCartContext();
  return (
    <>
      <div className={styles.navigation}>
        <h2 className={styles["navigation-title"]}>Webstore</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            value={searchTerm}
            setValue={setSearchTerm}
            placeholder="Search..."
          />
          <button className={styles["button-search"]} type="submit">
            <CiSearch />
          </button>
        </form>
        <div className={styles["navigation-auth"]}>
          <button
            className="cart-icon"
            type="button"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          {showCart && <Cart />}
          {!isLoggedIn ? (
            <button
              className={styles["button-auth"]}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          ) : (
            <button
              className={styles["button-auth"]}
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
