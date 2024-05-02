import * as React from "react";
import  { createContext, useEffect, useState } from "react";
import { User, UserContextProps } from "../types/user";
import axios from "axios";
// Create the context with the correct type
export const UserContext = createContext({} as UserContextProps);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialUserData: User = {
    id: 0,
    name: "",
    email: "",
    isAdmin: false,
    created_at: "",
    updated_at: "",
    jwt: "",
  };
  const [user, setUser] = useState(initialUserData);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  // use axios to get user data from the server
  useEffect(() => {
    axios
      .get("http://localhost:5001/users/0", config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
