import React from "react";
import styles from "./index.module.css";

const TextInput = ({ value, setValue, placeholder, type = "text" }) => {
  return (
    <input
      className={styles["input"]}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
