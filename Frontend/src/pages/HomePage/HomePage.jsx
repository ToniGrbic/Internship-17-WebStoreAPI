import React from "react";
import styles from "./HomePage.module.css";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const HomePage = ({ products, isLoading, isError }) => {
  if (isError) {
    return <h2>Something went wrong, try again later...</h2>;
  }

  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-title-container"]}>
        <h1>Welcome to the home page!</h1>
        <p>
          This is a simple e-commerce site. Search for a product to navigate to
          the products page where you can also filter by category.
        </p>
      </div>

      <h2>All Products:</h2>
      <div className={styles["products-container"]}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
};

export default HomePage;
