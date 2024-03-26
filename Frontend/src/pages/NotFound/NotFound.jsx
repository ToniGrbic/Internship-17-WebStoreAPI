import React from "react";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["not-found-container"]}>
      <p className={styles["not-found-text"]}>404 Error: Page not found</p>
      <button
        className={styles["go-back-button"]}
        onClick={() => navigate("/products")}
      >
        Go back
      </button>
    </div>
  );
};

export default NotFound;
