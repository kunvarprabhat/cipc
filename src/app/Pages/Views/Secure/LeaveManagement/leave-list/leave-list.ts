import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeType: 'faculty' | 'staff' | 'student';
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
}
@Component({
  selector: 'app-leave-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css'
})
export class LeaveList {
leaveRequests: LeaveRequest[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Dr. Sunita Verma',
      employeeType: 'faculty',
      leaveType: 'Sick Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-17',
      days: 3,
      reason: 'Medical treatment required',
      status: 'pending',
      appliedDate: '2024-03-10'
    },
    {
      id: '2',
      employeeId: 'CIPC001',
      employeeName: 'Rahul Kumar',
      employeeType: 'student',
      leaveType: 'Personal Leave',
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      days: 3,
      reason: 'Family function',
      status: 'approved',
      appliedDate: '2024-03-08',
      approvedBy: 'Principal'
    }
  ];

  showApplyForm = false;
  searchTerm = '';
  selectedStatus = '';
  selectedType = '';

  leaveTypes = ['Sick Leave', 'Casual Leave', 'Personal Leave', 'Emergency Leave', 'Medical Leave', 'Maternity Leave'];
  employeeTypes = ['faculty', 'staff', 'student'];
  statuses = ['pending', 'approved', 'rejected'];

  get filteredRequests() {
    return this.leaveRequests.filter(request => {
      const matchesSearch =
        request.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || request.status === this.selectedStatus;
      const matchesType = !this.selectedType || request.employeeType === this.selectedType;
      return matchesSearch && matchesStatus && matchesType;
    });
  }

  get pendingCount() {
    return this.leaveRequests.filter(req => req.status === 'pending').length;
  }

  get approvedCount() {
    return this.leaveRequests.filter(req => req.status === 'approved').length;
  }

  get rejectedCount() {
    return this.leaveRequests.filter(req => req.status === 'rejected').length;
  }

  toggleApplyForm() {
    this.showApplyForm = !this.showApplyForm;
  }

  getStatusClasses(status: string) {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  }
}
