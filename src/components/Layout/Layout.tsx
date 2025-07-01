// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";

const Layout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

export default Layout;
