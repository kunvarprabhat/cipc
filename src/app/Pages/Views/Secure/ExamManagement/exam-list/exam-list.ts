import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Exam {
  id: string;
  examName: string;
  course: string;
  type: 'internal' | 'mid-term' | 'final' | 'practical';
  date: string;
  time: string;
  duration: number;
  totalMarks: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}
@Component({
  standalone: true,
  selector: 'app-exam-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './exam-list.html',
  styleUrls: ['./exam-list.css']
})
export class ExamList {
exams: Exam[] = [
    {
      id: '1',
      examName: 'Mid-Term Examination',
      course: 'NUR101 - Fundamentals of Nursing',
      type: 'mid-term',
      date: '2024-03-15',
      time: '10:00',
      duration: 180,
      totalMarks: 100,
      status: 'scheduled'
    },
    {
      id: '2',
      examName: 'Practical Assessment',
      course: 'MLT201 - Clinical Biochemistry',
      type: 'practical',
      date: '2024-03-18',
      time: '14:00',
      duration: 120,
      totalMarks: 50,
      status: 'scheduled'
    }
  ];

  showAddForm = false;
  searchTerm = '';
  selectedType = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  examTypes = ['internal', 'mid-term', 'final', 'practical'];
  courses = [
    'NUR101 - Fundamentals of Nursing',
    'MLT201 - Clinical Biochemistry',
    'PHY101 - Basic Physiotherapy'
  ];

  get filteredExams(): Exam[] {
    return this.exams.filter(exam => {
      const matchesSearch = exam.examName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || exam.course.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.selectedType || exam.type === this.selectedType;
      return matchesSearch && matchesType;
    });
  }

  get paginatedExams(): Exam[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredExams.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredExams.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredExams.length);
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  viewDetails(exam: Exam) {
    console.log('View exam details:', exam);
    // Implement view details functionality
  }

  editExam(exam: Exam) {
    console.log('Edit exam:', exam);
    // Implement edit exam functionality
  }

  viewQuestionPaper(examId: string) {
    console.log('View question paper for:', examId);
    // Implement view question paper functionality
  }

  viewResults(examId: string) {
    console.log('View results for:', examId);
    // Implement view results functionality
  }
}
