import React from "react";
import styles from "./index.module.css";
import useFetchProducts from "../../hooks/useFetchProducts";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { products } = useFetchProducts();
  const navigate = useNavigate();

  return (
    <div className={styles["orders-container"]}>
      <h1>Orders</h1>
      {products.map((product) => {
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
                <p>${product.price}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
