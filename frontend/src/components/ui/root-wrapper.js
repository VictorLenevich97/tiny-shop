import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

export const RootWrapper = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
