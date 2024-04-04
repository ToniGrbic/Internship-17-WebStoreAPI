import React from "react";
import styles from "./index.module.css";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useUser();
  const navigate = useNavigate();

  return (
    <div className={styles["wishlist-container"]}>
      <h1>Wishlist</h1>
      {wishlist.map((product) => {
        return (
          <div
            className={styles["wishlist-item-container"]}
            onClick={() =>
              navigate(`/product/${product.id}`, { state: product })
            }
            key={product.id}
          >
            <div className={styles["wishlist-item"]}>
              <img
                src={product.image}
                alt="product"
                className={styles["wishlist-img"]}
              />
              <div className={styles["wishlist-details"]}>
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
              <div className={styles["wishlist-btn-container"]}>
                <button className={styles["wishlist-btn"]}>Remove</button>
                <button className={styles["wishlist-btn"]}>Add to Cart</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
