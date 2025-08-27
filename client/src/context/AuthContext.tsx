import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserType = {
  id: number;
  name: string;
  email: string;
  token: string;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  setUser: (user: UserType | null) => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

useEffect(() => {
  if (token) {
    AsyncStorage.setItem("authToken", token);
  } else {
    AsyncStorage.removeItem("authToken");
  }
}, [token]);

useEffect(() => {
  if (user) {
    AsyncStorage.setItem("authUserData", JSON.stringify(user));
  } else {
    AsyncStorage.removeItem("authUserData");
  }
}, [user]);

  return (
    <AuthContext.Provider value={{ token, user, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
