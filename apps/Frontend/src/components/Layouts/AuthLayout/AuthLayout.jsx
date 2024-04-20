import React from "react";
import styles from "./index.module.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const AuthLayout = () => {
  return (
    <div className={styles["auth-wrapper"]}>
      <div className={styles["auth-container"]}>
        <div className={styles["auth-home-link"]}>
          <Link to="/">
            <FaArrowLeft />
            Home
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
