import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditDiary from "./ModalEditDiary";

function CardDiary({ diaryData, onUpdated }) {
  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("vi-VN", options);
  }

  const handleEdit = () => {
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <Card sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {formatDate(diaryData.date)}
        </Typography>
        <Button
          onClick={handleEdit}
          startIcon={<EditIcon />}
          variant="outlined"
        >
          Chỉnh sửa
        </Button>
      </Box>

      {/*part 1*/}
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item size={{ xs: 4 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "rgba(255, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              border: "none",
              boxShadow: "none",
              color: "#b30000",
            }}
          >
            <Typography variant="body2">Điểm sức khoẻ</Typography>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              {diaryData.healthScore}/10
            </Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 4 }}>
          {" "}
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "rgba(255, 255, 0, 0.2)",
              backdropFilter: "blur(10px)",
              border: "none",
              boxShadow: "none",
              color: "#ffaa00",
            }}
          >
            <Typography variant="body2">Số tiền đã tiết kiệm được</Typography>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              {diaryData.moneySaved} (VND)
            </Typography>
          </Card>
        </Grid>
        <Grid item size={{ xs: 4 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "primary.light",
              backdropFilter: "blur(10px)",
              border: "none",
              boxShadow: "none",
              color: "primary.main",
            }}
          >
            <Typography variant="body2">Số thuốc lá đã tránh được </Typography>
            <Typography variant="h5" sx={{ fontWeight: "800" }}>
              {diaryData.cigarettesAvoided}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/*part 2*/}
      <Grid container spacing={1}>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Tâm trạng: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.mood}/10
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Mức độ thèm thuốc: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.cravingLevel}/5
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Mức độ stress: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.stressLevel}/5
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Thời gian ngủ: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.sleepHours} giờ
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Cân nặng: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.weight} kg
          </Typography>
        </Grid>
        <Grid
          item
          size={{ xs: 4 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="body2">Thời gian tập thể dục: </Typography>
          <Typography variant="body2" sx={{ color: "primary.main", ml: 1 }}>
            {diaryData.exerciseMinutes} phút
          </Typography>
        </Grid>
      </Grid>

      <Card
        sx={{
          p: 2,
          border: "none",
          boxShadow: "none",
          bgcolor: "rgba(216, 216, 216, 0.2)",
          color: "#4f4f4f	",
          my: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          Ghi chú:
        </Typography>
        <Typography variant="body2">{diaryData.notes}</Typography>
      </Card>
      <ModalEditDiary
        open={openModal}
        onClose={(updated) => {
          setOpenModal(false);
          if (updated) onUpdated(); // Reload lại diary list nếu update thành công
        }}
        diaryData={diaryData}
      />
    </Card>
  );
}

export default CardDiary;
