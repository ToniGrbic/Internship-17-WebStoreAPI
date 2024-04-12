import React from "react";
import styles from "./index.module.css";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { baseUrl } from "../../constants/constants";
import { useCartContext } from "../../providers/CartProvider/CartProvider";
import { useUser } from "../../providers/UserProvider/UserProvider";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

const Cart = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQty,
    onRemove,
    onRemoveAll,
  } = useCartContext();

  const { addToOrders } = useUser();

  const handleCheckout = async () => {
    if (!token) {
      toast.error("Please login to order");
      return;
    }

    const orders = cartItems.map((item) => {
      return fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.product.id,
          quantity: item.quantity,
        }),
      });
    });

    try {
      await Promise.all(orders);
      toast.success("Order placed successfully");
      addToOrders(cartItems);
      onRemoveAll();
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  };

  return (
    <div className={styles["cart-wrapper"]}>
      <div className={styles["cart-container"]}>
        <button
          type="button"
          className={styles["cart-heading"]}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={styles["heading"]}>Your Cart</span>
          <span className={styles["cart-num-items"]}>
            {totalQuantities} items
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className={styles["empty-cart"]}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className={styles["btn"]}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className={styles["product-container"]}>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <div className={styles["product"]} key={item.id}>
                  <img
                    src={item.product?.image}
                    className={styles["cart-product-image"]}
                  />
                  <div className={styles["item-desc"]}>
                    <div className={`${styles["flex"]} ${styles["top"]}`}>
                      <h5>{item.product.title}</h5>
                      <h4>${item.product.price}</h4>
                    </div>
                    <div className={`${styles["flex"]} ${styles["bottom"]}`}>
                      <div>
                        <p className={styles["quantity-desc"]}>
                          <span
                            className={styles["minus"]}
                            onClick={() => toggleCartItemQty(item.id, "dec")}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className={styles["num"]}>{item.quantity}</span>
                          <span
                            className={styles["plus"]}
                            onClick={() => toggleCartItemQty(item.id, "inc")}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className={styles["remove-item"]}
                        onClick={() => onRemove(item.id)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className={styles["cart-bottom"]}>
            <div className={styles["total"]}>
              <h3>Subtotal:</h3>
              <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <div className={styles["btn-container"]}>
              <button
                className={styles["btn"]}
                type="button"
                onClick={handleCheckout}
              >
                Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
