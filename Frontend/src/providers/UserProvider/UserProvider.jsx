import React, { createContext, useContext, useState } from "react";

const Context = createContext({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export const useUser = () => {
  return useContext(Context);
};

export { UserProvider };
