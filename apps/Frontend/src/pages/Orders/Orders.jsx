import React from "react";
import styles from "./index.module.css";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { orders } = useUser();
  const navigate = useNavigate();

  return (
    <div className={styles["orders-container"]}>
      <h1>Orders</h1>
      {orders.length < 1 ? (
        <h2>No orders yet...</h2>
      ) : (
        orders.map((product) => {
          return (
            <div
              className={styles["orders-item-container"]}
              onClick={() =>
                navigate(`/product/${product.id}`, { state: product })
              }
              key={product.id}
            >
              <div className={styles["orders-item"]}>
                <img
                  src={product.image}
                  alt="product"
                  className={styles["orders-img"]}
                />
                <div className={styles["orders-details"]}>
                  <h3>{product.title}</h3>
                  <div className={styles["orders-sub-details"]}>
                    <p> Total: ${product.price}</p>
                    <p> Quantity: {product.quantity}</p>
                    <p>Status: {product.status}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
