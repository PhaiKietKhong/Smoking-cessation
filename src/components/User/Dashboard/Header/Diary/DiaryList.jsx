import { USER_API_ROUTES } from "@/api/apiRouter";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function DiaryList() {
  const [listDiary, setListDiary] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const endDate = dayjs().format("YYYY-MM_DD");
    const startDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const token = localStorage.getItem("token");
    const fecthListDiary = async () => {
      try {
        const res = await axios.get(USER_API_ROUTES.GET_USER_PROGESS, {
          params: { startDate, endDate },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setListDiary(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  });

  return (
    <div>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          bgcolor: "primary.main",
          color: "primary.light",
          gap: 2,
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/diary")}
        />
        <Typography variant="h4">Nhật ký sức khoẻ</Typography>
      </Box>
    </div>
  );
}

export default DiaryList;
