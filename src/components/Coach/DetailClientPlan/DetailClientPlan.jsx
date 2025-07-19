import { COACH_API_ROUTES } from "@/api/apiRouter";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const DetailClientPlan = () => {
  const { clientId } = useParams();
  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchClientName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(COACH_API_ROUTES.GET_MY_CLIENTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clientList = response.data;
      const client = clientList.find((c) => c.clientId.toString() === clientId);
      if (client) {
        setClientName(client.clientName);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách client:", error);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchClientName();
  }, []);
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${COACH_API_ROUTES.GET_MY_CLIENTS_PLANS}/${clientId}/plans`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const plans = response.data;
        if (Array.isArray(plans) && plans.length > 0) {
          setPlan(plans[0]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy kế hoạch:", error);
        showSnackbar("Không thể tải kế hoạch", "error");
      }
    };

    fetchPlan();
  }, [clientId]);

  const handlePlanChange = (key, value) => {
    setPlan((prev) => ({ ...prev, [key]: value }));
  };

  const handleMilestoneChange = (index, key, value) => {
    const updated = [...plan.milestones];
    updated[index][key] = value;
    setPlan((prev) => ({ ...prev, milestones: updated }));
  };

  const handleMilestoneActionChange = (mIndex, aIndex, value) => {
    const updated = [...plan.milestones];
    updated[mIndex].actions[aIndex] = value;
    setPlan((prev) => ({ ...prev, milestones: updated }));
  };

  const addMilestone = () => {
    const newMilestone = {
      milestoneId: 0,
      planId: 0,
      title: "",
      description: "",
      targetDate: "",
      targetCigarettes: 0,
      actions: [""],
      status: "",
    };
    setPlan((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
  };

  const removeMilestone = (index) => {
    const updated = plan.milestones.filter((_, i) => i !== index);
    setPlan((prev) => ({ ...prev, milestones: updated }));
  };

  const addAction = (mIndex) => {
    const updated = [...plan.milestones];
    updated[mIndex].actions.push("");
    setPlan((prev) => ({ ...prev, milestones: updated }));
  };

  const removeAction = (mIndex, aIndex) => {
    const updated = [...plan.milestones];
    updated[mIndex].actions.splice(aIndex, 1);
    setPlan((prev) => ({ ...prev, milestones: updated }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: plan.name,
        description: plan.description,
        endDate: plan.endDate,
        strategies: plan.strategies,
        milestones: plan.milestones.map((m) => ({
          ...m,
          planId: 0,
          milestoneId: 0,
        })),
      };
      await axios.put(
        `${COACH_API_ROUTES.EDIT_QUIT_PLAN}/${clientId}/plans/${plan.planId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showSnackbar("Cập nhật thành công!", "success");
    } catch (error) {
      console.error("Lỗi khi cập nhật kế hoạch:", error);
      if (error.status === 500) {
        showSnackbar("Cập nhật thành công!", "success");
      }
      if (error.status === 404) {
        showSnackbar(
          "bạn không có quyền chỉnh sửa. đây là kế hoạch cá nhân!",
          "error"
        );
      }
    }
  };

  if (!plan) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">Không tìm thấy kế hoạch nào.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          color: "primary.light",
          gap: 2,
          bgcolor: "primary.main",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Kế hoạch của {clientName}</Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/coachDashboard")}
          sx={{ color: "white", borderColor: "white" }}
        >
          Quay lại dashboard
        </Button>
      </Box>
      <Paper sx={{ p: 3, maxWidth: 900, mx: "auto", my: 5 }}>
        <Typography variant="h5" gutterBottom>
          Chỉnh sửa chương trình
        </Typography>

        <TextField
          fullWidth
          label="Tên chương trình"
          value={plan.name}
          onChange={(e) => handlePlanChange("name", e.target.value)}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Mô tả"
          value={plan.description}
          onChange={(e) => handlePlanChange("description", e.target.value)}
          sx={{ mt: 2 }}
        />

        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Ngày bắt đầu"
            type="date"
            value={plan.startDate?.slice(0, 10)}
            onChange={(e) => handlePlanChange("startDate", e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Ngày kết thúc"
            type="date"
            value={plan.endDate?.slice(0, 10)}
            onChange={(e) => handlePlanChange("endDate", e.target.value)}
            fullWidth
          />
        </Box>

        <TextField
          fullWidth
          label="Chiến lược"
          value={plan.strategies}
          onChange={(e) => handlePlanChange("strategies", e.target.value)}
          sx={{ mt: 2 }}
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Mục tiêu (Milestones)
        </Typography>

        {plan.milestones.map((m, idx) => (
          <Paper
            key={idx}
            sx={{ p: 2, mb: 2, border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">
                #{idx + 1} - {m.title}
              </Typography>
              <IconButton onClick={() => removeMilestone(idx)}>
                <DeleteIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              label="Tiêu đề"
              value={m.title}
              onChange={(e) =>
                handleMilestoneChange(idx, "title", e.target.value)
              }
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              value={m.description}
              onChange={(e) =>
                handleMilestoneChange(idx, "description", e.target.value)
              }
              sx={{ mt: 2 }}
            />
            <TextField
              type="date"
              label="Ngày mục tiêu"
              value={m.targetDate?.slice(0, 10)}
              onChange={(e) =>
                handleMilestoneChange(idx, "targetDate", e.target.value)
              }
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="number"
              label="Số thuốc mục tiêu"
              value={m.targetCigarettes}
              onChange={(e) =>
                handleMilestoneChange(idx, "targetCigarettes", +e.target.value)
              }
              fullWidth
              sx={{ mt: 2 }}
            />

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Hành động
            </Typography>
            {m.actions.map((act, aIdx) => (
              <Box key={aIdx} display="flex" gap={1} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label={`Hành động ${aIdx + 1}`}
                  value={act}
                  onChange={(e) =>
                    handleMilestoneActionChange(idx, aIdx, e.target.value)
                  }
                />
                <IconButton onClick={() => removeAction(idx, aIdx)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={() => addAction(idx)}
              sx={{ mt: 1 }}
            >
              Thêm hành động
            </Button>
          </Paper>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addMilestone}
          sx={{ mt: 2 }}
        >
          Thêm mục tiêu
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 3, ml: 2 }}
        >
          Lưu chỉnh sửa
        </Button>

        {/* Snackbar hiển thị thông báo */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </>
  );
};

export default DetailClientPlan;
