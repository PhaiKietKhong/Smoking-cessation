import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter";

function Regist() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    FullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleRegister = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(USER_API_ROUTES.REGISTER, {
        username: formData.userName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName,
        phoneNumber: formData.phone,
      });

      setSuccess(true);
      setError(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setSuccess(false);
        setError(true);
        console.error(error);
      } else {
        console.error(error);
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
      {success ? (
        <Alert
          sx={{ position: "absolute", right: 10, top: 10 }}
          severity="success"
        >
          <AlertTitle>Thành công</AlertTitle>
          Đăng ký tài khoản thành công
        </Alert>
      ) : null}

      {/* Nền trang */}
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
            height: "85vh",
            width: {
              xs: "90%",
              sm: "70%",
              md: "90%",
            },
          }}
        >
          {/* Bảng bên trái */}
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
                height: "60%",
                padding: 3,
              }}
            >
              {[
                {
                  text: '💪 "Mỗi điếu thuốc bạn không hút là một chiến thắng!"',
                  color: "#7ED321",
                },
                {
                  text: '🌟 "Tương lai bạn sẽ cảm ơn bạn vì đã bỏ thuốc hôm nay"',
                  color: "#4A90E2",
                },
                {
                  text: '🚭 "Bạn mạnh mẽ hơn cơn thèm thuốc"',
                  color: "#FF6B6B",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`,
                    borderRadius: 2,
                    padding: 3,
                    mb: 3,
                    boxShadow: `0 8px 32px ${item.color}55`,
                    transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (i + 1)}deg)`,
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
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Bảng bên phải */}
          <Grid
            item
            size={{ xs: 12, md: 7 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 3,
                color: "primary.main",
              }}
            >
              Đăng ký tài khoản
            </Typography>
            <Box sx={{ maxWidth: 500, mx: "auto", width: "100%" }}>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    required
                    label="Họ và tên"
                    fullWidth
                    error={error}
                    size="small"
                    sx={{ flex: 1 }}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    label="Tên đăng nhập"
                    fullWidth
                    error={error}
                    inputRef={inputRef}
                    size="small"
                    sx={{ flex: 1 }}
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </Box>
                <TextField
                  required
                  label="Email"
                  fullWidth
                  size="small"
                  name="email"
                  error={error}
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  label="Số điện thoại"
                  fullWidth
                  size="small"
                  name="phone"
                  error={error}
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <TextField
                  required
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  error={error}
                  size="small"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  required
                  label="Nhập lại mật khẩu"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  size="small"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={error}
                  helperText={errorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <Typography>Tôi đồng ý với&nbsp;</Typography>
                  <Link href="/terms" underline="hover" color="primary">
                    Điều khoản và điều kiện
                  </Link>
                </Box>

                <Button
                  variant="contained"
                  sx={{ color: "#fff" }}
                  disabled={!acceptTerms}
                  onClick={handleRegister}
                >
                  Đăng ký
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Bạn đã có tài khoản?</Typography>
                &nbsp;
                <Link
                  onClick={() => navigate("/login")}
                  color="primary"
                  variant="body2"
                  sx={{ cursor: "pointer" }}
                >
                  Đăng nhập
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Regist;
