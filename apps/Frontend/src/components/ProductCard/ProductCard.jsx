import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = (e, product) => {
    if (window.scrollY) {
      window.scroll(0, 0);
    }
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <div
      className={styles["product-card"]}
      onClick={(e) => handleProductClick(e, product)}
    >
      <div className={styles["product-image"]}>
        <img src={product.image} alt={product.title} />
      </div>
      <h4>{product.title}</h4>
      <p>{product.category}</p>
    </div>
  );
};

export default ProductCard;
