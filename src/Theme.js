import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#b3a891",
      main: "#9c9079",
      light: "#e4d8be",
    },
    secondary: {
      main: "#56616e",
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
    body2: {
      color: "#6B7280",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9c9079",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#9c9079",
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
              borderColor: "#9c9079",
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
          color: "#21211f",
        },
      },
      contained: {
        color: "#21211f", // màu chữ cho nút contained
        backgroundColor: "#21211f", // nền nếu muốn tùy chỉnh
        "&:hover": {
          backgroundColor: "#dacfb5",
        },
      },
    },
  },
});

export default theme;
