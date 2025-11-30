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

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

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

  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredCourses.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  // Action button methods
  viewCourse(course: CourseDto) {
    console.log('View course:', course);
  }

  editCourse(course: CourseDto) {
    console.log('Edit course:', course);
  }

  deleteCourse(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses = this.courses.filter(c => c.id !== courseId);
    }
  }

  viewSyllabus(courseId: string) {
    console.log('View syllabus for:', courseId);
    // Implement view syllabus functionality
  }

  assignFaculty(courseId: string) {
    console.log('Assign faculty for:', courseId);
    // Implement assign faculty functionality
  }
}
