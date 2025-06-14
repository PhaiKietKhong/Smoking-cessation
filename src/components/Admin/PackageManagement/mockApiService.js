// Mock API Service for Package Management
import { useState } from 'react';

// Mock API functions for testing
export const mockApiService = {
  // Mock package data
  mockPackages: [
    {
      packageId: 1,
      name: "Basic Quit Plan",
      description: "A comprehensive 30-day smoking cessation program designed for beginners. Includes daily motivation, basic tracking tools, and community support.",
      price: 299000,
      type: "basic",
      durationDays: 30,
      isActive: true,
      assignedCoachId: 2,
      assignedCoachName: "Dr. Sarah Johnson",
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      packageId: 2,
      name: "Premium Recovery Program",
      description: "Enhanced 90-day program with personalized coaching, advanced tracking, medical consultations, and premium content access.",
      price: 899000,
      type: "premium",
      durationDays: 90,
      isActive: true,
      assignedCoachId: 3,
      assignedCoachName: "Dr. Michael Chen",
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-02-20T09:15:00Z",
      updatedAt: "2024-03-10T14:22:00Z"
    },
    {
      packageId: 3,
      name: "VIP Ultimate Freedom",
      description: "The most comprehensive 180-day program featuring 24/7 coach support, family counseling, medical monitoring, and lifetime access to premium resources.",
      price: 1999000,
      type: "vip",
      durationDays: 180,
      isActive: true,
      assignedCoachId: 2,
      assignedCoachName: "Dr. Sarah Johnson",
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-03-05T11:00:00Z",
      updatedAt: "2024-03-05T11:00:00Z"
    },
    {
      packageId: 4,
      name: "Quick Start Kit",
      description: "A focused 14-day intensive program for motivated quitters. Includes emergency support hotline and rapid response coaching.",
      price: 199000,
      type: "basic",
      durationDays: 14,
      isActive: true,
      assignedCoachId: null,
      assignedCoachName: null,
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-04-10T14:20:00Z",
      updatedAt: "2024-04-10T14:20:00Z"
    },
    {
      packageId: 5,
      name: "Family Support Package",
      description: "A 60-day program designed for families dealing with smoking addiction. Includes family counseling and support group access.",
      price: 699000,
      type: "premium",
      durationDays: 60,
      isActive: false,
      assignedCoachId: 3,
      assignedCoachName: "Dr. Michael Chen",
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-05-15T16:45:00Z",
      updatedAt: "2024-11-20T10:30:00Z"
    },
    {
      packageId: 6,
      name: "Corporate Wellness Program",
      description: "Tailored for workplace implementation. 120-day program with group sessions, progress tracking, and corporate reporting.",
      price: 1299000,
      type: "vip",
      durationDays: 120,
      isActive: true,
      assignedCoachId: null,
      assignedCoachName: null,
      createdById: 1,
      creatorName: "Admin User",
      createdAt: "2024-06-01T08:00:00Z",
      updatedAt: "2024-06-01T08:00:00Z"
    }
  ],

  // Mock coaches data
  mockCoaches: [
    {
      userId: 2,
      username: "coach_sarah",
      email: "sarah.johnson@example.com",
      fullName: "Dr. Sarah Johnson",
      role: "Coach",
      isActive: true,
      specialization: "Addiction Psychology"
    },
    {
      userId: 3,
      username: "coach_michael",
      email: "michael.chen@example.com",
      fullName: "Dr. Michael Chen",
      role: "Coach",
      isActive: true,
      specialization: "Behavioral Therapy"
    },
    {
      userId: 4,
      username: "coach_emma",
      email: "emma.wilson@example.com",
      fullName: "Dr. Emma Wilson",
      role: "Coach",
      isActive: true,
      specialization: "Medical Supervision"
    },
    {
      userId: 5,
      username: "coach_david",
      email: "david.brown@example.com",
      fullName: "David Brown",
      role: "Coach",
      isActive: false,
      specialization: "Group Therapy"
    }
  ],

  // Simulate API delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all packages
  async getPackages() {
    await this.delay();
    return { data: this.mockPackages, success: true };
  },

  // Get active packages only
  async getActivePackages() {
    await this.delay();
    const activePackages = this.mockPackages.filter(pkg => pkg.isActive);
    return { data: activePackages, success: true };
  },

  // Get package by ID
  async getPackageById(id) {
    await this.delay();
    const package_ = this.mockPackages.find(p => p.packageId === id);
    return package_ ? { data: package_, success: true } : { error: "Package not found", success: false };
  },

  // Create new package
  async createPackage(packageData) {
    await this.delay();
    const newPackage = {
      packageId: this.mockPackages.length + 1,
      ...packageData,
      isActive: true,
      assignedCoachId: null,
      assignedCoachName: null,
      createdById: 1,
      creatorName: "Admin User",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockPackages.push(newPackage);
    return { data: newPackage, success: true };
  },

  // Update package
  async updatePackage(id, packageData) {
    await this.delay();
    const index = this.mockPackages.findIndex(p => p.packageId === id);
    if (index !== -1) {
      this.mockPackages[index] = { 
        ...this.mockPackages[index], 
        ...packageData,
        updatedAt: new Date().toISOString()
      };
      return { data: this.mockPackages[index], success: true };
    }
    return { error: "Package not found", success: false };
  },

  // Delete package (soft delete)
  async deletePackage(id) {
    await this.delay();
    const index = this.mockPackages.findIndex(p => p.packageId === id);
    if (index !== -1) {
      this.mockPackages[index].isActive = false;
      this.mockPackages[index].updatedAt = new Date().toISOString();
      return { data: this.mockPackages[index], success: true };
    }
    return { error: "Package not found", success: false };
  },

  // Get all coaches
  async getCoaches() {
    await this.delay();
    const activeCoaches = this.mockCoaches.filter(coach => coach.isActive);
    return { data: activeCoaches, success: true };
  },

  // Assign coach to package
  async assignCoach(packageId, coachId) {
    await this.delay();
    const packageIndex = this.mockPackages.findIndex(p => p.packageId === packageId);
    const coach = this.mockCoaches.find(c => c.userId === coachId);
    
    if (packageIndex !== -1 && coach) {
      this.mockPackages[packageIndex].assignedCoachId = coachId;
      this.mockPackages[packageIndex].assignedCoachName = coach.fullName;
      this.mockPackages[packageIndex].updatedAt = new Date().toISOString();
      return { data: this.mockPackages[packageIndex], success: true };
    }
    return { error: "Package or coach not found", success: false };
  },

  // Get package statistics
  async getPackageStats() {
    await this.delay();
    const stats = {
      total: this.mockPackages.length,
      basic: this.mockPackages.filter(p => p.type === "basic").length,
      premium: this.mockPackages.filter(p => p.type === "premium").length,
      vip: this.mockPackages.filter(p => p.type === "vip").length,
      active: this.mockPackages.filter(p => p.isActive).length,
      inactive: this.mockPackages.filter(p => !p.isActive).length,
      withCoach: this.mockPackages.filter(p => p.assignedCoachId).length,
      withoutCoach: this.mockPackages.filter(p => !p.assignedCoachId).length
    };
    return { data: stats, success: true };
  },

  // Get packages by coach
  async getPackagesByCoach(coachId) {
    await this.delay();
    const packages = this.mockPackages.filter(p => p.assignedCoachId === coachId);
    return { data: packages, success: true };
  },

  // Get packages by type
  async getPackagesByType(type) {
    await this.delay();
    const packages = this.mockPackages.filter(p => p.type === type);
    return { data: packages, success: true };
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
