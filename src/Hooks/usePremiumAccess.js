import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ROUTES } from "@/api/apiRouter"; // Cập nhật nếu đường dẫn khác

const usePremiumAccess = () => {
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkPremium = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(USER_API_ROUTES.CHECK_PREMIUM_ACCESS, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHasPremiumAccess(res.data.hasPremiumAccess);
      } catch (err) {
        console.error("Lỗi kiểm tra quyền premium:", err);
        setError("Không thể kiểm tra quyền premium");
      } finally {
        setLoading(false);
      }
    };

    checkPremium();
  }, []);

  return { hasPremiumAccess, loading, error };
};

export default usePremiumAccess;
