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
import UserDashBoard from "./components/User/Dashboard/UserDashBoard";
import FormerSmokeData from "./components/User/Dashboard/FormerSmokerData/FormerSmokeData";
import BookingPage from "./components/User/BookingPage/BookingPage";
// import ChatPage from "./ChatPage/ChatPage";
import DiaryList from "./components/User/Diary/DiaryList";
import CreateAppointment from "./components/User/CreateMeetingPage/CreateAppointment";
import Diary from "./components/User/Diary/Diary";
import AppointmentList from "./components/User/Appointments/Appointments";
import PricingPage from "./components/Package/Package";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/onBoardingPage" element={<OnboadingPage />} />
          <Route path="/userDashBoard" element={<UserDashBoard />} />
          <Route path="/formersmokedata" element={<FormerSmokeData />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/booking" element={<BookingPage />} />
          {/* <Route path="/chatPage" element={<ChatPage />} /> */}
          <Route path="/diary" element={<Diary />} />
          <Route path="/diarylist" element={<DiaryList />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
