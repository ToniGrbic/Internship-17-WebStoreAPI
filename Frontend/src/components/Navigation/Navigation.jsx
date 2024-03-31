import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import TextInput from "../Inputs/TextInput";

const Navigation = ({ setSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchTerm);
    navigate("/products");
  };

  return (
    <>
      <div className={styles.navigation}>
        <h2 className={styles["navigation-title"]}>E-commerce</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            value={searchTerm}
            setValue={setSearchTerm}
            placeholder="Search..."
          />
          <button className={styles["button"]} type="submit">
            Search
          </button>
        </form>
        <div className={styles["navigation-auth"]}>
          <button
            className={styles["button"]}
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
