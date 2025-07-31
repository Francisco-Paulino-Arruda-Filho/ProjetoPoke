import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AuthLayout: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
