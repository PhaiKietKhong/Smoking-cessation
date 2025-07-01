import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = ({ requiredRole = "User" } = {}) => {
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (decoded.exp < currentTime) {
        console.warn("Token hết hạn.");
        localStorage.removeItem("token");
        navigate("/login");
      } else if (role !== requiredRole) {
        console.warn("Không đúng vai trò:", role);
        navigate("/"); // <-- nên dẫn tới trang riêng
      } else {
        setIsValid(true);
      }
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      navigate("/login");
    } finally {
      setIsChecking(false);
    }
  }, [navigate, requiredRole]);

  return { isValid, isChecking };
};
