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
import AuthLayout from "./components/Layouts/AuthLayout";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Routes>
      <Route element={<Navigation setSearch={setSearch} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products search={search} />} />
        <Route path="/product/:productId" element={<Product />} />
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
