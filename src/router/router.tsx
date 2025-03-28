import React from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"));
const PokePage = React.lazy(() => import("../pages/PokePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/pokemon/:id",
    element: <PokePage />,
  },
]);

export default router;