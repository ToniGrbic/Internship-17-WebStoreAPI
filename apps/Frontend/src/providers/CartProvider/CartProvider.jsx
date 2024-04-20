import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";
import { baseUrl } from "../../constants/constants";
import { useUser } from "../UserProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
const Context = createContext({
  showCart: false,
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  changeQty: () => {},
  addToCart: () => {},
  toggleCartItemQty: () => {},
  onRemove: () => {},
  onRemoveAll: () => {},
  setShowCart: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {},
  isProductInCart: () => {},
});

const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const { user } = useUser();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  let foundProduct;
  let index;

  useEffect(() => {
    (async () => {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/cart-items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Something went wrong, try again later!");
        }

        const cartItems = await res.json();
        cartItems.forEach((item) => {
          delete item.createdAt;
          delete item.updatedAt;
          delete item.userId;
        });
        setCartItems(cartItems);
        setTotalQuantities(
          cartItems.reduce((acc, item) => acc + item.quantity, 0)
        );
        setTotalPrice(
          cartItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )
        );
      } catch (error) {
        toast.error("Something went wrong, try again later!");
      }
    })();
  }, [user]);

  const addToCart = async (product, quantity) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/cart-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong, try again later!");
      }
      const data = await res.json();

      const newItem = {
        id: data?.id,
        product: { ...product },
        quantity,
      };
      toast.success(`${qty} ${product.title} added to cart`);
      setCartItems([...cartItems, newItem]);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  };

  const toggleCartItemQty = (id, type) => {
    if (type !== "inc" && type !== "dec") {
      throw new Error("Invalid type in toggleCartItemQty");
    }

    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);

    let newCartItems = cartItems.filter((item) => item.id !== id);
    let newQuantity = foundProduct.quantity;

    if (type === "inc") {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundProduct.product.price
      );
      setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
      newQuantity += 1;
    }

    if (type === "dec") {
      if (foundProduct.quantity <= 1) return;
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - foundProduct.product.price
      );
      setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
      newQuantity -= 1;
    }

    setCartItems([
      ...newCartItems.slice(0, index),
      { ...foundProduct, quantity: newQuantity },
      ...newCartItems.slice(index),
    ]);
  };

  const isProductInCart = (id) => {
    return cartItems.some((item) => item.product.id === id);
  };

  const onRemove = async (id) => {
    console.log(id);
    try {
      if (token) {
        const res = await fetch(`${baseUrl}/cart-items/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Something went wrong, try again later!");
        }
      }
      foundProduct = cartItems.find((item) => item.id === id);
      setCartItems(cartItems.filter((item) => item.id !== id));
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.product.price * foundProduct.quantity
      );
      setTotalQuantities(
        (prevTotalQty) => prevTotalQty - foundProduct.quantity
      );
      toast.success(`${foundProduct.product.title} removed from cart`);
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  };

  const onRemoveAll = async () => {
    try {
      if (token) {
        const res = await fetch(`${baseUrl}/cart-items`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Something went wrong, try again later!");
        }
      }
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Something went wrong, try again later!");
    }
  };

  const changeQty = (type) => {
    if (type === "dec") {
      qty >= 2 && setQty((prev) => prev - 1);
    }
    if (type === "inc") {
      setQty((prev) => prev + 1);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        changeQty,
        addToCart,
        toggleCartItemQty,
        onRemove,
        onRemoveAll,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        isProductInCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => {
  return useContext(Context);
};

export { CartProvider };
