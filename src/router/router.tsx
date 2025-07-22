// src/router/router.tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AddPokemonTeam from "../pages/TeamManager";

const Home = React.lazy(() => import("../pages/Home"));
const PokePage = React.lazy(() => import("../pages/PokePage"));
const SelecaoPage = React.lazy(() => import("../pages/SelecaoPage"));
const TeamBuilder = React.lazy(() => import("../pages/TeamBuilder"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true, 
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
        path: "team-builder/:id",
        element: <TeamBuilder />,
      },
      {
        path: ":id/selecionar",
        element: <SelecaoPage />,
      },
      {
        path: "add-pokemon-team",
        element: <AddPokemonTeam />,
      },
    ],
  },
]);

export default router;
