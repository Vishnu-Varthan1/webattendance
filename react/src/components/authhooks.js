import React, { useContext } from "react";
import { AuthContext } from "./components/Authcontext";

const SomeComponent = () => {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  // Use isLogged and setIsLogged here
};
