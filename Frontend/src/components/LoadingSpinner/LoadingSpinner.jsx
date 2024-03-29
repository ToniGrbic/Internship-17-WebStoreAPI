import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div>
      <h2 className={styles["loading-text"]}>Loading...</h2>
      <div className={styles["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
