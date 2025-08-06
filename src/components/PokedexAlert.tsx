import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  message: string;
  type: "success" | "error";
}

const PokedexAlert: React.FC<Props> = ({ message, type }) => {
  return (
    <Card
      sx={{
        backgroundColor: type === "success" ? "#c8f7c5" : "#f8d7da",
        border: "2px solid",
        borderColor: type === "success" ? "#4caf50" : "#f44336",
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          fontWeight="bold"
          color={type === "success" ? "#2e7d32" : "#c62828"}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokedexAlert;
