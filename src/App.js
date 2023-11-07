import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";
const App = () => {
  const User = useSelector((state) => state.user.currentUser);

  const router = createBrowserRouter([
    {
      path: "/home",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/profile",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/profile/:id",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/chats",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },

    {
      path: "/projects",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/projects/:id",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/projects/update/:id",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/home/:search",
      element: User !== null ? <Home /> : <Navigate replace to="/login" />,
    },
    {
      path: "/",
      element: <Navigate replace to="/home" />,
    },
    {
      path: "/login",
      element: User !== null ? <Navigate replace to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: User !== null ? <Navigate replace to="/" /> : <Register />,
    },
    {
      path: "*",
      element: <div>route not found</div>,
    },
  ]);
  const warning = useSelector((state) => state.warning);

  return (
    <div>
      {warning.toggle && <Toast />}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
