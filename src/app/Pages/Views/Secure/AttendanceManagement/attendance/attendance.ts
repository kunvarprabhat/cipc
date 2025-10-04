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
}
