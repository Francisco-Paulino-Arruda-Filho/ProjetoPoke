// src/router/router.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Home = React.lazy(() => import("../pages/Home"));
const PokePage = React.lazy(() => import("../pages/PokePage"));
const SelecaoPage = React.lazy(() => import("../pages/SelecaoPage"));
const TeamBuilder = React.lazy(() => import("../pages/TeamBuilder"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // TopBar está aqui
    children: [
      {
        index: true, // equivale a path: ""
        element: <Home />,
      },
      {
        path: "pokemon/:id",
        element: <PokePage />,
      },
      {
        path: "pagina-de-navegacao",
        element: <SelecaoPage />,
      },
      {
        path: "team-builder",
        element: <TeamBuilder />,
      },
      {
        path: "selecionar",
        element: <SelecaoPage />,
      },
    ],
  },
]);

export default router;
