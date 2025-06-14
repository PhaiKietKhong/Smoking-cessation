import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import theme from "./Theme";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Regist from "./components/Regist/Regist";
import Dashboard from "./components/Layout/Dashboard";
import CommunityPage from "./components/Community/CommunityPage";
import OnboadingPage from "./components/OnBoardingPage/OnboadingPage";
import UserDashBoard from "./components/User/UserDashBoard";
import FormerSmokeData from "./components/User/FormerSmokerData/FormerSmokeData";
import AdminDashboard from "./components/Admin/Dashboard";
import UserManagement from "./components/Admin/UserManagement/UserManagement";
import PackageManagement from "./components/Admin/PackageManagement/PackageManagement";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onBoardingPage" element={<OnboadingPage />} />
          <Route path="/userDashBoard" element={<UserDashBoard />} />
          <Route path="/formersmokedata" element={<FormerSmokeData />} />
          <Route path="/community" element={<CommunityPage />} />
            {/* Admin Routes */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/user-roles" element={<UserManagement />} />
          <Route path="/admin/user-analytics" element={<UserManagement />} />
          <Route path="/admin/packages" element={<PackageManagement />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
