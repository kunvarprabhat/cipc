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

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

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

  get paginatedRequests() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRequests.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push(-1);
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push(-1);
      }
      pages.push(total);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearchOrFilterChange() {
    this.currentPage = 1;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredRequests.length);
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

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  approveLeave(requestId: string) {
    const request = this.leaveRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'approved';
      request.approvedBy = 'Admin';
    }
  }

  rejectLeave(requestId: string) {
    const request = this.leaveRequests.find(r => r.id === requestId);
    if (request) {
      request.status = 'rejected';
      request.approvedBy = 'Admin';
    }
  }

  viewDetails(request: LeaveRequest) {
    console.log('View details:', request);
    // Implement view details functionality
  }

  printLeave(requestId: string) {
    console.log('Print leave request:', requestId);
    // Implement print functionality
  }
}
