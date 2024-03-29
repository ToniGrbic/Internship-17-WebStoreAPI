import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import styles from "./Products.module.css";
import useFetchProducts from "../hooks/useFetchProducts";
import LoadingSpinner from "../../components/LoadingSpinner";

const Products = ({ search }) => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, isLoading, isError } = useFetchProducts();

  const filterProducts = (searchTerm) => {
    return products.filter((product) => {
      const containsTitle = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const containsCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      if (searchTerm === "") return containsCategory;
      return containsTitle && containsCategory;
    });
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    const searchTerm = searchQuery || search;

    setSearchParams({ search: searchTerm });
    setFilteredProducts(filterProducts(searchTerm));
  }, [products, search, categoryFilter]);

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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          filteredProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
};

export default Products;
