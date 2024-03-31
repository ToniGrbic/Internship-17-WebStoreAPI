import React from "react";
import styles from "./index.module.css";

const TextInput = ({ value, setValue, placeholder }) => {
  return (
    <input
      className={styles["input"]}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
