import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Product.module.css";
import ProductCard from "../../components/ProductCard";

const Product = ({ products }) => {
  const location = useLocation();
  const [otherProducts, setOtherProducts] = useState([]);
  const product = location?.state;

  useEffect(() => {
    const otherProducts = products.filter((product) => {
      return product.id !== location?.state?.id;
    });
    setOtherProducts(otherProducts);
  }, [product, products]);

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
