import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface CourseDto {
  id: string;
  courseCode: string;
  courseName: string;
  department: string;
  credits: number;
  semester: number;
  type: 'core' | 'elective' | 'optional';
  faculty: string;
  status: 'active' | 'inactive';
}
@Component({
  selector: 'app-course',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './course.html',
  styleUrl: './course.css'
})
export class Course {
courses: CourseDto[] = [
    {
      id: '1',
      courseCode: 'NUR101',
      courseName: 'Fundamentals of Nursing',
      department: 'Nursing',
      credits: 4,
      semester: 1,
      type: 'core',
      faculty: 'Dr. Sunita Verma',
      status: 'active'
    },
    {
      id: '2',
      courseCode: 'MLT201',
      courseName: 'Clinical Biochemistry',
      department: 'Medical Laboratory Technology',
      credits: 3,
      semester: 3,
      type: 'core',
      faculty: 'Mr. Rajesh Kumar',
      status: 'active'
    }
  ];

  showAddForm = false;
  searchTerm = '';
  selectedDepartment = '';

  departments = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  courseTypes = ['core', 'elective', 'optional'];

  get filteredCourses() {
    return this.courses.filter(course => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || course.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
