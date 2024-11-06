import React, { useEffect, useLayoutEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";

import Homepage from "./component/Homepage";
import Login from "./component/Login";
import Register from "./component/Register";
import UserHome from "./component/UserHome";
import auth from "../firebase.config";
import AdminDashboard from "./component/AdminDashboard";
import PublicRoute from "./component/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
function App() {
  const [loading, setLoading] = useState(true);
  //Frontend routes
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    {
      element: <PublicRoute />,
      children: [{ path: "/user", element: <UserHome /> }],
    },
    {
      element: <ProtectedRoute />,
      children: [{ path: "/dashboard/*", element: <AdminDashboard /> }],
    },
    { path: "/login/admin", element: <Login /> },
    { path: "/register/admin", element: <Register /> },
    { path: "/login/user", element: <Login /> },
    { path: "/register/user", element: <Register /> },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        console.log(token, token.claims.admin);
        console.log(user);
        if (token.claims.admin) localStorage.setItem("Admin", true);
        else localStorage.removeItem("Admin");
      }
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ width: "100vw", padding: "0px", margin: "0px" }}>
      {loading ? <></> : <RouterProvider router={router} />}
    </div>
  );
}

export default App;
