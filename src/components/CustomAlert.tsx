import React from "react";
import { Card, CardContent, Typography, Box, Fade } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface CustomAlertProps {
  type: "success" | "error";
  title: string;
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, title, message }) => {
  const isSuccess = type === "success";

  return (
    <Fade in={true} timeout={300}>
      <Box
        position="fixed"
        top="50%"
        left="50%"
        zIndex={1300}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card
          sx={{
            width: 300,
            borderRadius: 3,
            boxShadow: 10,
            bgcolor: isSuccess ? "#d0f0c0" : "#ffcdd2",
            border: "5px solid",
            borderColor: isSuccess ? "#388e3c" : "#d32f2f",
            animation: "pop 0.4s ease-out",
          }}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              {isSuccess ? (
                <CheckCircleIcon sx={{ fontSize: 48, color: "#388e3c" }} />
              ) : (
                <ErrorIcon sx={{ fontSize: 48, color: "#d32f2f" }} />
              )}
              <Typography variant="h6" fontWeight="bold" mt={1}>
                {title}
              </Typography>
              <Typography variant="body2" textAlign="center">
                {message}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default CustomAlert;
