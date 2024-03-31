import React, { useState } from "react";
import styles from "../index.module.css";
import TextInput from "../../../components/Inputs/TextInput";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <>
      <h1>Sign up</h1>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <TextInput placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          setPassword={setPassword}
          type="password"
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setPassword={setConfirmPassword}
          type="password"
        />
        <button className={styles["button"]} type="submit">
          Register
        </button>
      </form>
      <p className={styles["link"]}>
        <a onClick={() => navigate("/login")}>Back to login</a>
      </p>
    </>
  );
};

export default Register;
