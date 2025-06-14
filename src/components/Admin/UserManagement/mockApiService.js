// Test API Integration for UserManagement
import { useState, useEffect } from 'react';

// Mock API functions for testing
export const mockApiService = {
  // Mock user data
  mockUsers: [
    {
      id: 1,
      username: "admin1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      roles: ["Admin"],
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      lastLogin: "2024-12-10T14:20:00Z"
    },
    {
      id: 2,
      username: "coach1",
      email: "coach@example.com",
      firstName: "John",
      lastName: "Coach",
      roles: ["Coach"],
      isActive: true,
      createdAt: "2024-02-20T09:15:00Z",
      lastLogin: "2024-12-09T16:45:00Z"
    },
    {
      id: 3,
      username: "user1",
      email: "user@example.com",
      firstName: "Jane",
      lastName: "Smith",
      roles: ["User"],
      isActive: true,
      createdAt: "2024-03-10T11:00:00Z",
      lastLogin: "2024-12-11T08:30:00Z"
    },
    {
      id: 4,
      username: "user2",
      email: "user2@example.com",
      firstName: "Bob",
      lastName: "Johnson",
      roles: ["User"],
      isActive: false,
      createdAt: "2024-04-05T14:20:00Z",
      lastLogin: "2024-11-28T12:15:00Z"
    }
  ],

  // Mock roles data
  mockRoles: [
    {
      id: 1,
      name: "Admin",
      description: "Full system administrator access",
      permissions: ["all"]
    },
    {
      id: 2,
      name: "Coach",
      description: "Coach with user guidance permissions",
      permissions: ["view_users", "create_content", "manage_sessions"]
    },
    {
      id: 3,
      name: "User",
      description: "Regular platform user",
      permissions: ["view_content", "create_posts", "view_profile"]
    }
  ],

  // Simulate API delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all users
  async getUsers() {
    await this.delay();
    return { data: this.mockUsers, success: true };
  },

  // Get user by ID
  async getUserById(id) {
    await this.delay();
    const user = this.mockUsers.find(u => u.id === id);
    return user ? { data: user, success: true } : { error: "User not found", success: false };
  },

  // Create new user
  async createUser(userData) {
    await this.delay();
    const newUser = {
      id: this.mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true
    };
    this.mockUsers.push(newUser);
    return { data: newUser, success: true };
  },

  // Update user
  async updateUser(id, userData) {
    await this.delay();
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsers[index] = { ...this.mockUsers[index], ...userData };
      return { data: this.mockUsers[index], success: true };
    }
    return { error: "User not found", success: false };
  },

  // Delete user
  async deleteUser(id) {
    await this.delay();
    const index = this.mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      this.mockUsers.splice(index, 1);
      return { success: true };
    }
    return { error: "User not found", success: false };
  },

  // Get all roles
  async getRoles() {
    await this.delay();
    return { data: this.mockRoles, success: true };
  },

  // Assign roles to user
  async assignRoles(userId, roleIds) {
    await this.delay();
    const user = this.mockUsers.find(u => u.id === userId);
    if (user) {
      const selectedRoles = this.mockRoles.filter(r => roleIds.includes(r.id)).map(r => r.name);
      user.roles = selectedRoles;
      return { data: user, success: true };
    }
    return { error: "User not found", success: false };
  },

  // Get user statistics
  async getUserStats() {
    await this.delay();
    const stats = {
      totalUsers: this.mockUsers.length,
      admins: this.mockUsers.filter(u => u.roles.includes("Admin")).length,
      coaches: this.mockUsers.filter(u => u.roles.includes("Coach")).length,
      regularUsers: this.mockUsers.filter(u => u.roles.includes("User")).length,
      activeUsers: this.mockUsers.filter(u => u.isActive).length,
      inactiveUsers: this.mockUsers.filter(u => !u.isActive).length
    };
    return { data: stats, success: true };
  }
};

// Hook for using the mock API
export const useMockApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { error: err.message, success: false };
    }
  };

  return {
    loading,
    error,
    callApi,
    ...mockApiService
  };
};

export default mockApiService;
