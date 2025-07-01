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

const EditProgramModal = ({ open, onClose, data, onSave }) => {
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

  const [errors, setErrors] = useState({
    dateError: "",
    fieldErrors: {},
    milestoneErrors: [],
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
      setErrors({
        dateError: "",
        fieldErrors: {},
        milestoneErrors: [],
      });
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
    setErrors((prev) => ({
      ...prev,
      milestoneErrors: [...prev.milestoneErrors, {}],
    }));
  };

  const removeMilestone = (index) => {
    const updated = formData.milestones.filter((_, i) => i !== index);
    const updatedErrors = errors.milestoneErrors.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, milestones: updated }));
    setErrors((prev) => ({ ...prev, milestoneErrors: updatedErrors }));
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

  const validate = () => {
    const {
      name,
      description,
      startDate,
      endDate,
      quitReason,
      strategies,
      milestones,
    } = formData;

    const start = new Date(startDate);
    const end = new Date(endDate);
    let isValid = true;

    const newErrors = {
      dateError: "",
      fieldErrors: {},
      milestoneErrors: [],
    };

    if (!name.trim()) {
      newErrors.fieldErrors.name = "Bắt buộc";
      isValid = false;
    }
    if (!description.trim()) {
      newErrors.fieldErrors.description = "Bắt buộc";
      isValid = false;
    }
    if (!startDate) {
      newErrors.fieldErrors.startDate = "Bắt buộc";
      isValid = false;
    }
    if (!endDate) {
      newErrors.fieldErrors.endDate = "Bắt buộc";
      isValid = false;
    }
    if (startDate && endDate && end < start) {
      newErrors.dateError = "Ngày kết thúc không được sớm hơn ngày bắt đầu";
      isValid = false;
    }

    if (!quitReason.trim()) {
      newErrors.fieldErrors.quitReason = "Bắt buộc";
      isValid = false;
    }
    if (!strategies.trim()) {
      newErrors.fieldErrors.strategies = "Bắt buộc";
      isValid = false;
    }

    let lastDate = start;

    milestones.forEach((m, i) => {
      const mErrors = {};

      if (!m.title.trim()) {
        mErrors.title = "Bắt buộc";
        isValid = false;
      }
      if (!m.description.trim()) {
        mErrors.description = "Bắt buộc";
        isValid = false;
      }

      if (!m.targetDate) {
        mErrors.targetDate = "Bắt buộc";
        isValid = false;
      } else {
        const tDate = new Date(m.targetDate);
        if (tDate < start || tDate > end) {
          mErrors.targetDate =
            "Ngày mục tiêu phải nằm trong khoảng thời gian chương trình";
          isValid = false;
        }
        if (tDate < lastDate) {
          mErrors.targetDate =
            "Ngày mục tiêu phải lớn hơn hoặc bằng ngày mục tiêu trước đó";
          isValid = false;
        }
        lastDate = tDate;
      }

      if (m.targetCigarettes < 0 || isNaN(m.targetCigarettes)) {
        mErrors.targetCigarettes = "Phải là số không âm";
        isValid = false;
      }

      m.actions.forEach((act, j) => {
        if (!act.trim()) {
          if (!mErrors.actions) mErrors.actions = {};
          mErrors.actions[j] = "Bắt buộc";
          isValid = false;
        }
      });

      newErrors.milestoneErrors[i] = mErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

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
          error={!!errors.fieldErrors.name}
          helperText={errors.fieldErrors.name}
        />
        <TextField
          fullWidth
          label="Mô tả"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.fieldErrors.description}
          helperText={errors.fieldErrors.description}
        />
        <TextField
          fullWidth
          type="date"
          label="Ngày bắt đầu"
          value={formData.startDate?.slice(0, 10) || ""}
          onChange={(e) => handleInputChange("startDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
          error={!!errors.fieldErrors.startDate}
          helperText={errors.fieldErrors.startDate}
        />
        <TextField
          fullWidth
          type="date"
          label="Ngày kết thúc"
          value={formData.endDate?.slice(0, 10) || ""}
          onChange={(e) => handleInputChange("endDate", e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 1 }}
          error={!!errors.fieldErrors.endDate || !!errors.dateError}
          helperText={errors.fieldErrors.endDate || errors.dateError}
        />

        <TextField
          fullWidth
          label="Lý do bỏ thuốc"
          value={formData.quitReason}
          onChange={(e) => handleInputChange("quitReason", e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.fieldErrors.quitReason}
          helperText={errors.fieldErrors.quitReason}
        />
        <TextField
          fullWidth
          label="Chiến lược"
          value={formData.strategies}
          onChange={(e) => handleInputChange("strategies", e.target.value)}
          sx={{ mb: 2 }}
          error={!!errors.fieldErrors.strategies}
          helperText={errors.fieldErrors.strategies}
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            Mục tiêu (Milestones)
          </Typography>

          {formData.milestones.map((milestone, index) => {
            const mErr = errors.milestoneErrors[index] || {};
            return (
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
                  error={!!mErr.title}
                  helperText={mErr.title}
                />
                <TextField
                  fullWidth
                  label="Mô tả"
                  value={milestone.description}
                  onChange={(e) =>
                    handleMilestoneChange(index, "description", e.target.value)
                  }
                  sx={{ mt: 2 }}
                  error={!!mErr.description}
                  helperText={mErr.description}
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
                  error={!!mErr.targetDate}
                  helperText={mErr.targetDate}
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
                  error={!!mErr.targetCigarettes}
                  helperText={mErr.targetCigarettes}
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
                      error={!!(mErr.actions && mErr.actions[aIndex])}
                      helperText={mErr.actions && mErr.actions[aIndex]}
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
            );
          })}

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

export default EditProgramModal;
