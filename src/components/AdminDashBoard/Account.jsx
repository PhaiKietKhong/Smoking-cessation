// React + MUI Version of the Account Management Page

import React, { useState } from "react";
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
  InputLabel,
  FormControl,
  TextField,
  Chip,
  Paper,
  Toolbar
} from "@mui/material";
import { Edit, Delete, Close } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const initialAccounts = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
  { id: "2", name: "Sarah Wilson", email: "sarah@example.com", role: "Coach", status: "Active", joinDate: "2024-02-20" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Admin", status: "Active", joinDate: "2024-01-10" },
  { id: "4", name: "Emily Brown", email: "emily@example.com", role: "User", status: "Active", joinDate: "2024-03-05" },
  { id: "5", name: "David Lee", email: "david@example.com", role: "Coach", status: "Banned", joinDate: "2024-02-28" },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [editingId, setEditingId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [banDays, setBanDays] = useState("");

  const handleRoleChange = (id, newRole) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, role: newRole } : acc));
    setEditingId(null);
  };

  const handleDeleteAccount = () => {
    if (selectedAccount && deleteReason && banDays) {
      setAccounts(accounts.map(acc => acc.id === selectedAccount.id ? { ...acc, status: "Banned" } : acc));
      setDialogOpen(false);
      setSelectedAccount(null);
      setDeleteReason("");
      setBanDays("");
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "error";
      case "Coach": return "primary";
      case "User": return "default";
      default: return "default";
    }
  };

  return (
    <Box p={3}>

      <Box
        sx={{
          background: "linear-gradient(90deg, #e0f7fa 0%, #f0fdfa 100%)", // xanh nhạt gradient
          borderRadius: 2,
          p: 3,
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: "#1d4ed8", fontWeight: "bold" }}>
          User Accounts
        </Typography>
        <Typography variant="h6" sx={{ color: "#2563eb", mt: 1 }}>
          Manage user accounts, roles, and quit smoking progress
        </Typography>
      </Box>
      <Paper>
        <Toolbar>
          <Typography variant="h6">Details</Typography>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.id}>
                <TableCell>{account.name}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  {editingId === account.id ? (
                    <FormControl size="small">
                      <Select
                        value={account.role}
                        onChange={(e) => handleRoleChange(account.id, e.target.value)}
                      >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Coach">Coach</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip label={account.role} color={getRoleColor(account.role)} size="small" />
                      <IconButton size="small" onClick={() => setEditingId(account.id)}>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Chip label={account.status} color={account.status === "Active" ? "primary" : "error"} size="small" />
                </TableCell>
                <TableCell>{account.joinDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDialogOpen(true);
                      setSelectedAccount(account);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Please provide a reason and ban duration:
          </Typography>
          <TextField
            fullWidth
            label="Reason"
            multiline
            rows={3}
            margin="dense"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
          />
          <TextField
            fullWidth
            label="Ban duration (days)"
            type="number"
            margin="dense"
            value={banDays}
            onChange={(e) => setBanDays(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} startIcon={<Close />}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" disabled={!deleteReason || !banDays}>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
