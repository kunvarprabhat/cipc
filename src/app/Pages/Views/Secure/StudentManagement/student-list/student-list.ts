import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  program: string;
  semester: number;
  admissionDate: string;
  phone: string;
  status: 'active' | 'inactive';
}
@Component({
  selector: 'app-student-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {
students: Student[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@student.cipc.edu',
      department: 'Nursing',
      program: 'UG',
      semester: 6,
      admissionDate: '2022-07-15',
      phone: '+91 9876543210',
      status: 'active'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      name: 'Priya Sharma',
      email: 'priya.sharma@student.cipc.edu',
      department: 'Medical Laboratory Technology',
      program: 'Diploma',
      semester: 4,
      admissionDate: '2023-01-10',
      phone: '+91 9876543211',
      status: 'active'
    }
  ];

  showAddForm: boolean = false;
  searchTerm: string = '';
  selectedDepartment: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  departments: string[] = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  programs: string[] = ['UG', 'PG', 'Diploma', 'Certification'];

  get filteredStudents(): Student[] {
    return this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || student.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredStudents.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  viewStudent(student: Student) {
    console.log('View student:', student);
    // Implement view student functionality
  }

  editStudent(student: Student) {
    console.log('Edit student:', student);
    // Implement edit student functionality
  }

  deleteStudent(studentId: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(s => s.id !== studentId);
    }
  }

  generateIdCard(student: Student) {
    console.log('Generate ID card for:', student);
    // Implement ID card generation
  }
}
