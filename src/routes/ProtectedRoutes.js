import React from "react";
import Routering from "./routes";
import { authenticatedUser } from "../services/authentication";

const ProtectedRoute = ({ children }) => {
  return authenticatedUser() ? children : <Routering />;
};

export default ProtectedRoute;
