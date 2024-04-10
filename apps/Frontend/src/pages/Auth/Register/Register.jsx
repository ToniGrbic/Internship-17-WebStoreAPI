import React, { useState } from "react";
import styles from "../index.module.css";
import TextInput from "../../../components/Inputs/TextInput";
import { useNavigate } from "react-router";
import { baseUrl } from "../../../constants/constants";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) {
      toast.error("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("something went wrong, try again later!");
      }

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("something went wrong, try again later!");
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
        <TextInput placeholder="Username" value={name} setValue={setName} />
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
