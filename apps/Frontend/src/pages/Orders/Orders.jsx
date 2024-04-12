import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useUser } from "../../providers/UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/constants";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

const Orders = () => {
  const { setOrders, orders } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const cookies = new Cookies();
      const token = cookies.get("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Something went wrong, try again later!");
        }

        const orders = await res.json();
        setOrders(orders);
      } catch (error) {
        toast.error("Something went wrong, try again later!");
      }
    })();
  }, []);

  return (
    <div className={styles["orders-container"]}>
      <h1>Orders</h1>
      {orders.length < 1 ? (
        <h2>No orders yet...</h2>
      ) : (
        orders.map((order) => {
          return (
            <div
              className={styles["orders-item-container"]}
              onClick={() =>
                navigate(`/product/${order.product.id}`, {
                  state: order.product,
                })
              }
              key={order.id}
            >
              <div className={styles["orders-item"]}>
                <img
                  src={order.product.image}
                  alt="product"
                  className={styles["orders-img"]}
                />
                <div className={styles["orders-details"]}>
                  <h3>{order.product.title}</h3>
                  <div className={styles["orders-sub-details"]}>
                    <p> Total: ${order.product.price * order.quantity}</p>
                    <p> Quantity: {order.quantity}</p>
                    <p>Status: {order.status}</p>
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
