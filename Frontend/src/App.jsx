import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navigation from "./components/Layouts/Navigation";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import useFetchProducts from "./hooks/useFetchProducts";
import AuthLayout from "./components/Layouts/AuthLayout";

function App() {
  const [search, setSearch] = useState("");
  const { products, categories, isLoading, isError } = useFetchProducts();

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
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<Product products={products} />}
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
export default App;
