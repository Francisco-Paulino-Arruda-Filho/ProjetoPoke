import { createContext, useState, useContext, useEffect } from "react";
import AuthContextType from "../components/AuthContextType/AuthContextType";
import User from "../models/User";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Lê do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user)); // <- Salva também no localStorage
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user"); // <- Remove do localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
