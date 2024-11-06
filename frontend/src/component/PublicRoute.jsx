import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../../firebase.config";
const PublicRoute = () => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
