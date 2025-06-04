import { createTheme } from "@mui/material/styles";

const primaryDarkColor = "#025f4c";
const primaryMainColor = "#38b277";
const primaryLightColor = "#e8fde8";

const theme = createTheme({
  palette: {
    primary: {
      dark: primaryDarkColor,
      main: primaryMainColor,
      light: primaryLightColor,
    },
    secondary: {
      main: "#fff",
      dark: "#21211f",
    },
    background: {
      default: "#F8F9FA",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryMainColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: primaryMainColor,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#F9FAFB",
            "& fieldset": {
              borderColor: "#E5E7EB",
            },
            "&:hover fieldset": {
              borderColor: "#D1D5DB",
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryMainColor,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
          padding: "12px 24px",
        },
        contained: {
          color: primaryLightColor,
          backgroundColor: primaryMainColor,
          "&:hover": {
            backgroundColor: primaryDarkColor,
          },
        },
        outlined: {
          borderColor: primaryMainColor,
          color: primaryMainColor,
          "&:hover": {
            borderColor: primaryDarkColor,
            backgroundColor: "rgba(56, 178, 119, 0.04)",
          },
        },
        text: {
          color: primaryMainColor,
          "&:hover": {
            backgroundColor: "rgba(56, 178, 119, 0.04)",
          },
        },
      },
    },
  },
});

export default theme;
