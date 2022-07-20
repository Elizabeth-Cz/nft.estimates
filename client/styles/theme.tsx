import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FCC } from "@DEFS/types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7c1ed8",
      dark: "#4400a5",
      light: "#b255ff",
    },
    secondary: {
      main: "#1a218e",
      dark: "#00005f",
      light: "#574abf",
      contrastText: "#cc77e1",
    },
  },
  typography: {
    fontFamily: "Inter,Roboto,Arial",
    fontSize: 14,
    allVariants: {
      color: "#2E4E6F",
    },
  },
});

export const ThemeScope: FCC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
