import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectRoute from "./ProtectRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TodoPage from "../pages/TodoList";
import PageNotFound from "../pages/PageNotFound";
import UnauthorizedPage from "../pages/Unauthorize";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        element: <ProtectRoute />,
        children: [{ path: "todo", element: <TodoPage /> }],
      },

      { path: "/unauthorized", element: <UnauthorizedPage /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

export default appRouter;
