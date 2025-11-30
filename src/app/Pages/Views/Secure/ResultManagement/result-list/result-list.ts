import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Result {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  semester: number;
  examType: string;
  examDate: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: 'pass' | 'fail' | 'supplementary';
  publishedDate: string;
}

@Component({
  standalone: true,
  selector: 'app-result-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './result-list.html',
  styleUrls: ['./result-list.css']
})
export class ResultList {
  results: Result[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      studentName: 'Rahul Kumar',
      course: 'Nursing',
      semester: 6,
      examType: 'Final Examination',
      examDate: '2024-03-15',
      subject: 'Fundamentals of Nursing',
      marksObtained: 85,
      totalMarks: 100,
      percentage: 85,
      grade: 'A',
      status: 'pass',
      publishedDate: '2024-03-20'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      studentName: 'Priya Sharma',
      course: 'Medical Laboratory Technology',
      semester: 4,
      examType: 'Final Examination',
      examDate: '2024-03-15',
      subject: 'Clinical Biochemistry',
      marksObtained: 72,
      totalMarks: 100,
      percentage: 72,
      grade: 'B',
      status: 'pass',
      publishedDate: '2024-03-20'
    },
    {
      id: '3',
      studentId: 'CIPC003',
      studentName: 'Amit Singh',
      course: 'Physiotherapy',
      semester: 2,
      examType: 'Internal Assessment',
      examDate: '2024-02-28',
      subject: 'Basic Physiotherapy',
      marksObtained: 45,
      totalMarks: 100,
      percentage: 45,
      grade: 'D',
      status: 'fail',
      publishedDate: '2024-03-05'
    }
  ];

  showAddForm = false;
  searchTerm = '';
  selectedCourse = '';
  selectedSemester = '';
  selectedStatus = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  courses = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  examTypes = ['Internal Assessment', 'Mid-Term', 'Final Examination', 'Supplementary Examination'];
  statuses = ['pass', 'fail', 'supplementary'];

  get filteredResults(): Result[] {
    return this.results.filter(result => {
      const matchesSearch = 
        result.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        result.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        result.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCourse = !this.selectedCourse || result.course === this.selectedCourse;
      const matchesSemester = !this.selectedSemester || result.semester.toString() === this.selectedSemester;
      const matchesStatus = !this.selectedStatus || result.status === this.selectedStatus;
      return matchesSearch && matchesCourse && matchesSemester && matchesStatus;
    });
  }

  get paginatedResults(): Result[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredResults.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredResults.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredResults.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  // Action button methods
  viewResult(result: Result) {
    console.log('View result:', result);
    // Implement view result functionality
  }

  editResult(result: Result) {
    console.log('Edit result:', result);
    // Implement edit result functionality
  }

  deleteResult(resultId: string) {
    if (confirm('Are you sure you want to delete this result?')) {
      this.results = this.results.filter(r => r.id !== resultId);
    }
  }

  publishResult(resultId: string) {
    const result = this.results.find(r => r.id === resultId);
    if (result) {
      result.publishedDate = new Date().toISOString().split('T')[0];
      alert('Result published successfully!');
    }
  }

  downloadResult(result: Result) {
    console.log('Download result:', result);
    // Implement download result functionality
  }

  printResult(result: Result) {
    console.log('Print result:', result);
    // Implement print result functionality
  }

  getGradeColor(grade: string): string {
    switch(grade) {
      case 'A+':
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B+':
      case 'B':
        return 'bg-blue-100 text-blue-800';
      case 'C+':
      case 'C':
        return 'bg-yellow-100 text-yellow-800';
      case 'D':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  }

  get passedCount(): number {
    return this.results.filter(r => r.status === 'pass').length;
  }

  get failedCount(): number {
    return this.results.filter(r => r.status === 'fail').length;
  }

  get averagePercentage(): number {
    if (this.results.length === 0) return 0;
    const total = this.results.reduce((sum, r) => sum + r.percentage, 0);
    return Math.round((total / this.results.length) * 10) / 10;
  }
}

