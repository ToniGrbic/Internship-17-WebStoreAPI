import React, { useState } from "react";
import styles from "./Navigation.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../providers/CartProvider/CartProvider";
import { AiOutlineShopping } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import defaultAvatar from "../../../assets/default-avatar.jpg";
import TextInput from "../../Inputs/TextInput";
import Dropdown from "../../Dropdown";
import Cart from "../../Cart";
import Cookies from "universal-cookie";

const Navigation = ({ setSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    navigate("/products");
  };
  const cookies = new Cookies();
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
            className={styles["cart-icon"]}
            type="button"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <AiOutlineShopping />
            <span className={styles["cart-item-qty"]}>{totalQuantities}</span>
          </button>
          {showCart && <Cart />}
          {!cookies.get("token") ? (
            <button
              className={styles["button-auth"]}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          ) : (
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              className={styles["user-avatar"]}
            >
              <img src={defaultAvatar} alt="avatar" />
              <div className={styles["user-name"]}>
                {cookies.get("username")}
              </div>
              <Dropdown showDropdown={showDropdown} />
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
