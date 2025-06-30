import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { USER_API_ROUTES } from "@/api/apiRouter";
import axios from "axios";

const SendPlan = ({ open, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    packageId: 1,
    coachId: null,
    quitReason: "",
    strategies: "",
    milestones: [],
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...formData.milestones];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleActionChange = (mIndex, aIndex, value) => {
    const updated = [...formData.milestones];
    updated[mIndex].actions[aIndex] = value;
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          title: "",
          description: "",
          targetDate: "",
          targetCigarettes: 0,
          actions: [""],
        },
      ],
    }));
  };

  const removeMilestone = (index) => {
    const updated = formData.milestones.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const addAction = (index) => {
    const updated = [...formData.milestones];
    updated[index].actions.push("");
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const removeAction = (mIndex, aIndex) => {
    const updated = [...formData.milestones];
    updated[mIndex].actions.splice(aIndex, 1);
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        USER_API_ROUTES.POST_QUIT_PLAN,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSave?.(response.data);
      onClose(true);
    } catch (error) {
      console.error("Lỗi API:", error);
      alert("Không thể gửi chương trình. Vui lòng thử lại.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa chương trình</DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Tên chương trình"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Mô tả"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Ngày bắt đầu"
          value={formData.startDate.slice(0, 10)}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Ngày kết thúc"
          value={formData.endDate.slice(0, 10)}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Lý do bỏ thuốc"
          value={formData.quitReason}
          onChange={(e) => handleInputChange("quitReason", e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Chiến lược"
          value={formData.strategies}
          onChange={(e) => handleInputChange("strategies", e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            Mục tiêu (Milestones)
          </Typography>

          {formData.milestones.map((milestone, index) => (
            <Box
              key={index}
              sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Mục tiêu #{index + 1}
                </Typography>
                <IconButton onClick={() => removeMilestone(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              <TextField
                fullWidth
                label="Tiêu đề"
                value={milestone.title}
                onChange={(e) =>
                  handleMilestoneChange(index, "title", e.target.value)
                }
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Mô tả"
                value={milestone.description}
                onChange={(e) =>
                  handleMilestoneChange(index, "description", e.target.value)
                }
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                type="date"
                label="Ngày mục tiêu"
                value={milestone.targetDate?.slice(0, 10) || ""}
                onChange={(e) =>
                  handleMilestoneChange(index, "targetDate", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Số thuốc mục tiêu"
                type="number"
                value={milestone.targetCigarettes}
                onChange={(e) =>
                  handleMilestoneChange(
                    index,
                    "targetCigarettes",
                    Number(e.target.value)
                  )
                }
                sx={{ mt: 2 }}
              />

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Hành động
              </Typography>

              {milestone.actions.map((action, aIndex) => (
                <Box key={aIndex} display="flex" gap={1} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label={`Hành động ${aIndex + 1}`}
                    value={action}
                    onChange={(e) =>
                      handleActionChange(index, aIndex, e.target.value)
                    }
                  />
                  <IconButton onClick={() => removeAction(index, aIndex)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}

              <Button
                startIcon={<AddIcon />}
                onClick={() => addAction(index)}
                sx={{ mt: 1 }}
              >
                Thêm hành động
              </Button>
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addMilestone}
          >
            Thêm mục tiêu
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendPlan;
