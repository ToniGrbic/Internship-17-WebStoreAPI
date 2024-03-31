import React, { useState } from "react";
import styles from "../index.module.css";
import TextInput from "../../../components/Inputs/TextInput";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
          setPassword={setPassword}
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
