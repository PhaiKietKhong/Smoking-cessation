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
import BookingPage from "./components/User/CoachListPage/CoachListPage";
import DiaryList from "./components/User/Diary/DiaryList";
import CreateAppointment from "./components/User/CreateMeetingPage/CreateAppointment";
import Diary from "./components/User/Diary/Diary";
import AppointmentList from "./components/User/Appointments/Appointments";
import CoachListPage from "./components/User/CoachListPage/CoachListPage";
import ChatPage from "./components/User/ChatPage/ChatPage";
import PricingPage from "./components/Package/Package";
import { AppSidebar } from "./components/AdminDashBoard/SideBar";
import RootLayout from "./components/AdminDashBoard/layout";
import AccountsPage from "./components/AdminDashBoard/Account";
import CoachesPage from "./components/AdminDashBoard/Coaches";
import DashboardPage from "./components/AdminDashBoard/Pagee";
import CoachDashboard from "./components/Coach/CoachDashboard";
import ChatPageCoach from "./components/Coach/ChatPageCoach/ChatPageCoach";
import Appointments from "./components/Coach/Appointments/Appointments";
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
          <Route path="/chatPage" element={<ChatPage />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diarylist" element={<DiaryList />} />
          <Route path="/createAppointment" element={<CreateAppointment />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/coachlistpage" element={<CoachListPage />} />
          <Route path="/package" element={<PricingPage />} />
          <Route path="/coachDashboard" element={<CoachDashboard />} />
          <Route path="/chatPageCoach/:clientId" element={<ChatPageCoach />} />
          <Route path="/coach/appointments" element={<Appointments />} />
          <Route
            path="/accounts"
            element={
              <RootLayout>
                <AccountsPage />
              </RootLayout>
            }
          />
          <Route
            path="/coaches"
            element={
              <RootLayout>
                <CoachesPage />
              </RootLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <RootLayout>{/* Thêm component Analytics nếu có */}</RootLayout>
            }
          />
          <Route
            path="/AdminDashBoard"
            element={
              <RootLayout>
                <DashboardPage />
              </RootLayout>
            }
          />
          {/* Thêm các route admin khác nếu cần */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
