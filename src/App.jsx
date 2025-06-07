import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./Theme";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Regist from "./components/Regist/Regist";
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/regist" element={<Regist />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
