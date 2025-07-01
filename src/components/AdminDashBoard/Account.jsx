import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Paper,
  Toolbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
} from "@mui/material";
import { Edit, Block, Restore } from "@mui/icons-material";
import axios from "axios";
import { ADMIN_API_ROUTES } from "@/api/apiRouter";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingRoleId, setEditingRoleId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [banDays, setBanDays] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(ADMIN_API_ROUTES.GET_ACCOUNTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    } catch (err) {
      console.error("Lỗi lấy tài khoản:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (accountId, newRole) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${ADMIN_API_ROUTES.CHANGE_ROLE_ACCOUNT}/${accountId}`,
        {
          newRole: newRole,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.accountId === accountId ? { ...acc, role: newRole } : acc
        )
      );
      setEditingRoleId(null);
    } catch (err) {
      console.error("Lỗi đổi vai trò:", err);
    }
  };

  const handleOpenDialog = (acc) => {
    setSelectedAccount(acc);
    setBanReason("");
    setBanDays("");
    setDialogOpen(true);
  };

  const handleBan = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${ADMIN_API_ROUTES.BAN_ACCOUNT}/${selectedAccount.accountId}/block`,
        { reason: banReason, blockDays: parseInt(banDays, 10) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.accountId === selectedAccount.accountId
            ? { ...acc, status: "Banned" }
            : acc
        )
      );
      setDialogOpen(false);
    } catch (err) {
      console.error("Lỗi ban:", err);
    }
  };

  const handleUnban = async (accountId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${ADMIN_API_ROUTES.UNBAN_ACCOUNT}/${accountId}/unblock`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.accountId === accountId ? { ...acc, status: "Active" } : acc
        )
      );
    } catch (err) {
      console.error("Lỗi unban:", err);
    }
  };

  const getRoleColor = (role) => {
    if (role === "Admin") return "error";
    if (role === "Coach") return "primary";
    return "default";
  };

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Paper sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Quản lý tài khoản</Typography>
        </Toolbar>
      </Paper>

      {/* ✅ Không bọc Table bằng Box hoặc div */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Tham gia</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {accounts.map((acc) => (
              <TableRow key={acc.accountId}>
                <TableCell>{acc.fullName}</TableCell>
                <TableCell>{acc.email}</TableCell>
                <TableCell>
                  {editingRoleId === acc.accountId ? (
                    <FormControl size="small">
                      <Select
                        value={acc.role}
                        onChange={(e) =>
                          handleRoleChange(acc.accountId, e.target.value)
                        }
                      >
                        <MenuItem value="User">Người dùng</MenuItem>
                        <MenuItem value="Admin">Quản trị viên</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={
                          acc.role === "User"
                            ? "Nguời dùng"
                            : acc.role === "Coach"
                            ? "Huấn luyện viên"
                            : "Quản trị viên"
                        }
                        color={getRoleColor(acc.role)}
                        size="small"
                      />
                      <IconButton
                        onClick={() => setEditingRoleId(acc.accountId)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={acc.status || "Active"}
                    color={acc.status === "Banned" ? "error" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(acc.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>
                  {acc.status === "Banned" ? (
                    <Button
                      color="success"
                      variant="outlined"
                      onClick={() => handleUnban(acc)}
                      startIcon={<Restore fontSize="small" />}
                      sx={{
                        borderColor: "#43a047",
                        color: "#43a047",
                        "&:hover": {
                          borderColor: "#1b5e20",
                          backgroundColor: "rgba(67,160,71,0.08)",
                          color: "#1b5e20",
                        },
                        fontWeight: 600,
                      }}
                    >
                      mở tài khoản
                    </Button>
                  ) : (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleOpenDialog(acc)}
                      startIcon={<Block fontSize="small" />}
                      sx={{
                        borderColor: "#e53935",
                        color: "#e53935",
                        "&:hover": {
                          borderColor: "#b71c1c",
                          backgroundColor: "rgba(229,57,53,0.08)",
                          color: "#b71c1c",
                        },
                        fontWeight: 600,
                      }}
                    >
                      Khoá tài khoản
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Dialog block */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Block tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            label="Lý do"
            fullWidth
            multiline
            rows={2}
            margin="dense"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
          />
          <TextField
            label="Số ngày block"
            fullWidth
            type="number"
            margin="dense"
            value={banDays}
            onChange={(e) => setBanDays(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button
            color="error"
            disabled={!banReason || !banDays}
            onClick={handleBan}
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
