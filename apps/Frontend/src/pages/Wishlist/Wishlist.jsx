import React, { useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../providers/CartProvider/CartProvider";
import { useUser } from "../../providers/UserProvider/UserProvider";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { baseUrl } from "../../constants/constants";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, setWishlist } = useUser();
  const { addToCart, isProductInCart, onRemove, cartItems } = useCartContext();
  const navigate = useNavigate();

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    if (isProductInCart(product.id)) {
      const cartItem = cartItems.find((item) => item.product.id === product.id);
      onRemove(cartItem.id);
    } else {
      addToCart(product, 1);
    }
  };

  useEffect(() => {
    (async () => {
      const cookies = new Cookies();
      const token = cookies.get("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/wishlists`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Something went wrong, try again later!");
        }

        const wishlist = await res.json();
        setWishlist(wishlist);
      } catch (error) {
        toast.error("Something went wrong, try again later!");
      }
    })();
  }, []);

  return (
    <div className={styles["wishlist-container"]}>
      <h1>Wishlist</h1>
      {wishlist.length < 1 ? (
        <h2>No items in wishlist...</h2>
      ) : (
        wishlist.map((wishlistItem) => {
          return (
            <div
              className={styles["wishlist-item-container"]}
              onClick={() =>
                navigate(`/product/${wishlistItem.product.id}`, {
                  state: wishlistItem.product,
                })
              }
              key={wishlistItem.id}
            >
              <div className={styles["wishlist-item"]}>
                <img
                  src={wishlistItem.product.image}
                  alt="wishlistItem.product"
                  className={styles["wishlist-img"]}
                />
                <div className={styles["wishlist-details"]}>
                  <h3>{wishlistItem.product.title}</h3>
                  <p>${wishlistItem.product.price}</p>
                </div>
                <div className={styles["wishlist-btn-container"]}>
                  <button
                    className={styles["wishlist-btn"]}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(wishlistItem.id);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className={styles["wishlist-btn"]}
                    onClick={(e) => handleCartClick(e, wishlistItem.product)}
                  >
                    {isProductInCart(wishlistItem.product.id)
                      ? "In Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Wishlist;
