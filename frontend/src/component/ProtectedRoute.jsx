import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "../../firebase.config";

const ProtectedRoute = () => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/" replace />;
  } else return <Outlet />;
};

export default ProtectedRoute;
