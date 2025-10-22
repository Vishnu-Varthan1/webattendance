import React, { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: (loggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  setIsLogged: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    typeof window !== "undefined" && !!localStorage.getItem("token")
  );

  useEffect(() => {
    const syncLoginStatus = () =>
      setIsLogged(typeof window !== "undefined" && !!localStorage.getItem("token"));
    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
