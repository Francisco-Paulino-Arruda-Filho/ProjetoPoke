import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Layout/Layout";    // com TopBar
import AuthLayout from "../components/AuthLayout/AuthLayout";  // sem TopBar

import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddPokemonTeam from "../pages/TeamManager";
import PokePage from "../pages/PokePage";
import SelecaoPage from "../pages/SelecaoPage";
import TeamBuilder from "../pages/TeamBuilder";
import AuthErrorPage from "../pages/AuthErrorPage";
import AppErrorPage from "../pages/AppErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,  // layout sem topbar (login, cadastro)
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "cadastro", element: <RegisterPage /> },
    ],
    errorElement: <AuthErrorPage />,
  },
  {
    path: "/",
    element: <MainLayout />,  // layout com topbar (app principal)
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "pokemon/:id", element: <PokePage /> },
      { path: ":id/selecionar", element: <SelecaoPage /> },
      { path: "team-builder/:id", element: <TeamBuilder /> },
      { path: "add-pokemon-team", element: <AddPokemonTeam /> },

    ],
    errorElement: <AppErrorPage />,
  },
]);
export default router;
