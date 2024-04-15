import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCartContext } from "../../providers/CartProvider/CartProvider";
import { useUser } from "../../providers/UserProvider/UserProvider";
import styles from "./Product.module.css";
import ProductCard from "../../components/ProductCard";

const Product = ({ products }) => {
  const { state: product } = useLocation();
  const [otherProducts, setOtherProducts] = useState([]);

  const { isProductInCart, onRemove, addToCart, cartItems } = useCartContext();
  const { isOnWishlist, removeFromWishlist, addToWishlist, wishlist } =
    useUser();

  useEffect(() => {
    const otherProducts = products.filter((product) => {
      return product.id !== location?.state?.id;
    });
    setOtherProducts(otherProducts);
  }, [product, products]);

  const handleCartClick = () => {
    const cartItem = cartItems.find((item) => item.product.id === product.id);
    if (isProductInCart(product.id)) onRemove(cartItem.id);
    else addToCart(product, 1);
  };

  const handleWishlistClick = () => {
    const wishlistItem = wishlist.find(
      (item) => item.product.id === product.id
    );
    if (isOnWishlist(product.id)) removeFromWishlist(wishlistItem.id);
    else addToWishlist(product);
  };

  return (
    <>
      {product && (
        <>
          <div className={styles["product-container"]}>
            <div className={styles["product-image"]}>
              <img src={product.image} alt={product.title} />
            </div>
            <div className={styles["product-details"]}>
              <h2>{product.title}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <div className={styles["buttons-container"]}>
                <button className={styles["button"]} onClick={handleCartClick}>
                  {isProductInCart(product.id) ? "In Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlistClick}
                  className={styles["button"]}
                >
                  {isOnWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
          <h2 className={styles["other-products-title"]}>Other products: </h2>
          <div className={styles["products-container"]}>
            {otherProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Product;
