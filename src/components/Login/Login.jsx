import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const inputRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(USER_API_ROUTES.LOGIN, {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      const decoded = jwtDecode(token);
      console.log(decoded);
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === "Coach") {
        navigate("/coachDashboard");
      } else if (role === "Admin") {
        navigate("/adminDashboard");
      } else {
        checkSurvey(token);
      }
    } catch (error) {
      if (error.response) {
        console.error("Lỗi server:", error.response.status);
        console.error("Chi tiết:", error.response.data);
        if (error.response.status === 400) {
          setError(true);
        } else if (error.response.status === 401) {
          setError(true);
        } else {
          alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      }
    }
  };
  const checkSurvey = async (token) => {
    try {
      const response = await axios.get(USER_API_ROUTES.GET_SMOKING_STATUS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      if (data) {
        navigate("/userDashBoard");
      }
    } catch (error) {
      console.error("Failed to check smoking status:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        navigate("/onBoardingPage");
      }
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background bubbles */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -200,
          width: 600,
          height: 400,
          background: "linear-gradient(135deg, #7ED321 0%, #5BA617 100%)",
          borderRadius: "50%",
          opacity: 0.1,
          transform: "rotate(-15deg)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -250,
          width: 700,
          height: 500,
          background: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
          borderRadius: "50%",
          opacity: 0.1,
          transform: "rotate(25deg)",
        }}
      />

      <Box flex sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Grid
          container
          sx={{
            justifyContent: "center",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: { xs: "90%", sm: "70%", md: "90%" },
            height: "85vh",
          }}
        >
          {/* LEFT SIDE */}
          <Grid
            item
            size={{ xs: 0, md: 5 }}
            sx={{
              padding: 2,
              backgroundColor: "rgba(228,216,190, 0.5)",
              display: { xs: "none", md: "block" },
            }}
          >
            <Logo />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginY: 4,
                height: "60%",
                padding: 3,
              }}
            >
              {[
                {
                  bg: "#7ED321",
                  text: '"Mỗi điếu thuốc bạn không hút là một chiến thắng!"',
                },
                {
                  bg: "#4A90E2",
                  text: '"Tương lai bạn sẽ cảm ơn bạn vì đã bỏ thuốc hôm nay"',
                },
                {
                  bg: "#FF6B6B",
                  text: '"Bạn mạnh mẽ hơn cơn thèm thuốc"',
                },
              ].map(({ bg, text }, i) => (
                <Box
                  key={i}
                  sx={{
                    background: `linear-gradient(135deg, ${bg} 0%, ${
                      bg === "#7ED321"
                        ? "#5BA617"
                        : bg === "#4A90E2"
                        ? "#357ABD"
                        : "#EE5A52"
                    } 100%)`,
                    borderRadius: "20px",
                    padding: 3,
                    marginBottom: 3,
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
                    transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "rotate(0deg) scale(1.05)",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: 600,
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid
            item
            size={{ xs: 12, md: 7 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Logo sx={{ display: { md: "none" }, textAlign: "center" }} />
            <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  display: { xs: "none", md: "block" },
                  color: "primary.main",
                }}
              >
                Chào mừng trở lại :)
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mb: 4,
                  color: "#6B7280",
                  lineHeight: 1.6,
                  display: { xs: "none", md: "block" },
                }}
              >
                Để duy trì kết nối với chúng tôi, vui lòng đăng nhập bằng tên
                tài khoản và mật khẩu cá nhân của bạn
              </Typography>

              {/* LOGIN FORM */}
              <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <TextField
                  required
                  id="username"
                  label="Tên tài khoản"
                  inputRef={inputRef}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  error={error}
                />
                <TextField
                  required
                  id="password"
                  label="Mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  error={error}
                  helperText={error && "Tên tài khoản hoặc mật khẩu không đúng"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ color: "primary.main" }} />
                          ) : (
                            <Visibility sx={{ color: "primary.main" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "remember me" }}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}
                      >
                        Ghi nhớ đăng nhập
                      </Typography>
                    }
                  />
                  <Typography
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                      fontSize: { xs: "0.75rem", md: "1rem" },
                    }}
                  >
                    Quên mật khẩu?
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  sx={{ color: "white" }}
                  variant="contained"
                >
                  Đăng nhập ngay
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2">Không có tài khoản ? </Typography>
                &nbsp;
                <Link
                  onClick={() => navigate("/regist")}
                  color="primary.main"
                  variant="body2"
                >
                  Đăng Ký.
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
