import { createTheme } from "@mui/material/styles";

const primaryDarkColor = "#025f4c";
const primaryMainColor = "#368e38";
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
      },
      contained: {
        color: "#21211f", // màu chữ cho nút contained
        backgroundColor: "#21211f", // nền nếu muốn tùy chỉnh
        // "&:hover": {
        //   backgroundColor: "#dacfb5",
        // },
      },
    },
  },
});

export default theme;
