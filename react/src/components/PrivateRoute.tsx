import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isLogged: boolean;
  children: React.ReactElement | React.ReactElement[];
}

const PrivateRoute: React.FC<Props> = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
