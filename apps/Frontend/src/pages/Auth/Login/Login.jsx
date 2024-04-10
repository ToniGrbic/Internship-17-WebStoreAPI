import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "../index.module.css";
import TextInput from "../../../components/Inputs/TextInput";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider/UserProvider";
import Cookies from "universal-cookie";
import { baseUrl } from "../../../constants/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUser } = useUser();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Invalid email or password!");
      }

      const data = await res.json();
      const cookies = new Cookies();
      cookies.set("token", data.token, { path: "/" });
      cookies.set("username", data.name, { path: "/" });

      setIsLoggedIn(true);
      setUser(data);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password!");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1>Sign in</h1>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <TextInput placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <button className={styles["button"]} type="submit">
          Login
        </button>
      </form>
      <p className={styles["link"]}>
        Don't have a account?{" "}
        <a onClick={() => navigate("/register")}>Sign Up</a>
      </p>
    </>
  );
};

export default Login;
