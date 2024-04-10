import React from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className={styles["auth-wrapper"]}>
      <div className={styles["auth-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
