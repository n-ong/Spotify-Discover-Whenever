import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#9d9d9d",
      main: "#434343",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#9cdcaa",
      main: "#1db954",
      dark: "#008633",
      contrastText: "#ffffff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
