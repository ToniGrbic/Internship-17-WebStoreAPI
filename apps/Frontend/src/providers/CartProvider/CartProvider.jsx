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

  let foundProduct;
  let index;

  useEffect(() => {
    (async () => {
      const cookies = new Cookies();
      const token = cookies.get("token");
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

  const addToCart = (product, quantity) => {
    const ProductInCart = cartItems.find((item) => item.id === product.id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQty) => prevTotalQty + quantity);

    if (ProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      const newItem = { id: uuid(), product: { ...product }, quantity };
      setCartItems([...cartItems, newItem]);
    }
    toast.success(`${qty} ${product.title} added to cart`);
  };

  const toggleCartItemQty = (id, type) => {
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
    return cartItems.some((item) => item.id === id);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.product.price * foundProduct.quantity
    );
    setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.quantity);
    toast.success(`${foundProduct.title} removed from cart`);
  };

  const onRemoveAll = () => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
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
