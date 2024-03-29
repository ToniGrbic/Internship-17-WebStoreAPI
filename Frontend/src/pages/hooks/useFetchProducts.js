import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const url = "https://fakestoreapi.com/products";

  const getCategories = (products) => {
    const categories = products.reduce((acc, product) => {
      if (!acc.includes(product.category)) acc.push(product.category);
      return acc;
    }, []);
    return categories;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);

        const categories = getCategories(products);
        setCategories(["All", ...categories]);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    })();
  }, []);

  return { products, categories, isLoading, isError };
};

export default useFetchProducts;
