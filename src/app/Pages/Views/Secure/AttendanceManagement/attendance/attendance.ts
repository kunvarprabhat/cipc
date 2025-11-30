import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardHeader } from "../../../../Layout/Secure/dash-board-header/dash-board-header";


interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  markedBy: string;
}
@Component({
  selector: 'app-attendance',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DashBoardHeader,],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance {
attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      studentName: 'Rahul Kumar',
      course: 'NUR101 - Fundamentals of Nursing',
      date: '2024-03-01',
      status: 'present',
      markedBy: 'Dr. Sunita Verma'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      studentName: 'Priya Sharma',
      course: 'NUR101 - Fundamentals of Nursing',
      date: '2024-03-01',
      status: 'absent',
      markedBy: 'Dr. Sunita Verma'
    },
    {
      id: '3',
      studentId: 'CIPC003',
      studentName: 'Amit Singh',
      course: 'MLT201 - Clinical Biochemistry',
      date: '2024-03-01',
      status: 'late',
      markedBy: 'Mr. Rajesh Kumar'
    }
  ];

  showMarkForm = false;
  searchTerm = '';
  selectedCourse = '';
  selectedDate = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  courses: string[] = [
    'NUR101 - Fundamentals of Nursing',
    'MLT201 - Clinical Biochemistry',
    'PHY101 - Basic Physiotherapy'
  ];

  get filteredRecords() {
    return this.attendanceRecords.filter(record => {
      const matchesSearch =
        record.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCourse = !this.selectedCourse || record.course === this.selectedCourse;
      const matchesDate = !this.selectedDate || record.date === this.selectedDate;
      return matchesSearch && matchesCourse && matchesDate;
    });
  }

  get paginatedRecords() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRecords.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRecords.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredRecords.length);
  }

  get totalStudents() {
    return this.attendanceRecords.length;
  }
  get presentStudents() {
    return this.attendanceRecords.filter(r => r.status === 'present').length;
  }
  get absentStudents() {
    return this.attendanceRecords.filter(r => r.status === 'absent').length;
  }
  get lateStudents() {
    return this.attendanceRecords.filter(r => r.status === 'late').length;
  }
  get attendancePercentage() {
    return Math.round((this.presentStudents / this.totalStudents) * 100);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  editAttendance(record: AttendanceRecord) {
    console.log('Edit attendance:', record);
    // Implement edit attendance functionality
  }

  viewHistory(recordId: string) {
    console.log('View history for:', recordId);
    // Implement view history functionality
  }

  sendNotification(recordId: string) {
    console.log('Send notification for:', recordId);
    // Implement send notification functionality
  }
}
