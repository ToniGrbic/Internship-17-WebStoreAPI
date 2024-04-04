import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { useCartContext } from "../../providers/CartProvider/CartProvider";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

const Cart = () => {
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQty,
    onRemove,
  } = useCartContext();

  const handleCheckout = () => {
    console.log("add orders to db");
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
                    src={item?.image}
                    className={styles["cart-product-image"]}
                  />
                  <div className={styles["item-desc"]}>
                    <div className={`${styles["flex"]} ${styles["top"]}`}>
                      <h5>{item.title}</h5>
                      <h4>${item.price}</h4>
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
