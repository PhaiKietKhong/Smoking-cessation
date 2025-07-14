"use client";

import { USER_API_ROUTES } from "@/api/apiRouter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import {
  Calendar,
  Check,
  Crown,
  FileText,
  Home,
  MessageCircle,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const basicFeatures = [
  {
    icon: <Home className="w-5 h-5" />,
    text: "Trò chuyện với cộng đồng ",
    included: true,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    text: "Tạo kế hoạch cai thuốc cá nhân",
    included: true,
  },
  {
    icon: <Users className="w-5 h-5" />,
    text: "Theo dõi và cập nhật tiến trình hằng ngày",
    included: true,
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    text: "Chat trực tiếp với huấn luyện viên",
    included: false,
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    text: "Đặt lịch meeting với huấn luyện viên",
    included: false,
  },
  {
    icon: <Star className="w-5 h-5" />,
    text: "Tư vấn cá nhân hóa",
    included: false,
  },
];

const premiumFeatures = basicFeatures.map((f) => ({ ...f, included: true }));

export default function PricingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpgrade = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        USER_API_ROUTES.UPGRADE_PACKAGE,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: "Nâng cấp Premium thành công!",
        severity: "success",
      });
      setTimeout(() => navigate("/userDashboard"), 2000);
    } catch (err) {
      console.error("Lỗi khi nâng cấp:", err);
      setSnackbar({
        open: true,
        message: "Có lỗi xảy ra khi nâng cấp. Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 999,
        }}
      >
        <Button
          onClick={() => navigate("/")} // hoặc navigate("/") nếu muốn về trang chính
          startIcon={<ArrowBackIcon />}
          sx={{}}
        >
          Quay lại
        </Button>
      </Box>

      <div
        className="max-h-screen  flex items-center justify-center px-4 py-12"
        style={{ backgroundColor: "#e8fde8" }}
      >
        <div className="p-6 max-w-5xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Chọn Gói Dịch Vụ
            </h2>
            <p className="text-base text-gray-600">
              So sánh và lựa chọn gói phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic */}
            <div className="shadow-lg bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Gói Basic
                </h3>
                <p className="text-sm text-gray-500">
                  Khởi đầu hoàn hảo cho hành trình của bạn
                </p>
                <div className="mt-3">
                  <div className="text-2xl font-bold text-green-600">
                    Miễn phí
                  </div>
                  <p className="text-sm text-gray-400">Sử dụng vĩnh viễn</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {basicFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center text-sm ${
                        f.included
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {f.included ? <Check className="w-4 h-4" /> : f.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        f.included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-xl transition-all duration-300 active:scale-95 py-2.5"
              >
                <Zap className="w-4 h-4 mr-2" /> Gói cho tất cả người dùng
              </Button>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 relative overflow-hidden">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-yellow-300" />
                </div>
                <h3 className="text-lg font-bold mb-1">Gói Premium</h3>
                <p className="text-sm text-green-100">
                  Trải nghiệm cao cấp với hỗ trợ toàn diện
                </p>
                <div className="mt-3">
                  <div className="text-2xl font-bold">
                    299,000₫ <span className="text-sm font-normal">/tháng</span>
                  </div>
                  <p className="text-sm text-green-100">
                    Hoặc 2,990,000₫/năm (tiết kiệm 17%)
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {premiumFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center">
                      <Check className="w-4 h-4 text-yellow-300" />
                    </div>
                    <span className="text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="outlined"
                onClick={handleUpgrade}
                sx={{
                  backgroundColor: "white",
                  width: "100%",
                  fontWeight: 600,
                  borderRadius: 2,
                  py: 1.5,
                  "&:hover": {
                    backgroundColor: "#f4fef7",
                  },
                }}
              >
                <Crown className="w-4 h-4 mr-2" /> Nâng Cấp Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
