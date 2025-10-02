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
}
