import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <Routes>
      <Route element={<Navigation setSearch={setSearch} />}>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              isLoading={isLoading}
              isError={isError}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              categories={categories}
              search={search}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<Product products={products} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
