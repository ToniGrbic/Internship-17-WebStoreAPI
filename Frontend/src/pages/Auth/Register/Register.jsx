import React, { useState } from "react";
import styles from "../index.module.css";
import TextInput from "../../../components/Inputs/TextInput";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    toast.success("Account created successfully!");
  };
  return (
    <>
      <h1>Sign up</h1>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <TextInput placeholder="Email" value={email} setValue={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
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
