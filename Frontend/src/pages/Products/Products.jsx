import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import styles from "./Products.module.css";

const Products = ({ products, categories, search }) => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [_, setSearchParams] = useSearchParams();

  const filterProducts = (products, searchTerm) => {
    return products.filter((product) => {
      const containsTilte = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const containsCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      if (searchTerm === "") return containsCategory;
      return containsTilte && containsCategory;
    });
  };

  useEffect(() => {
    setSearchParams({ search });
    setFilteredProducts(filterProducts(products, search));
  }, [search, categoryFilter]);

  return (
    <div>
      <div className={styles["products-categories"]}>
        {categories.map((category) => {
          return (
            <button
              className={styles["category-button"]}
              key={category}
              onClick={() => setCategoryFilter(category)}
              style={{
                backgroundColor:
                  categoryFilter === category ? "lightblue" : "white",
              }}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className={styles["products-container"]}>
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
