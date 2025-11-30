import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// src/app/models.ts
export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  status: 'available' | 'issued' | 'maintenance';
}

export interface BookIssue {
  id: string;
  bookTitle: string;
  studentName: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  status: 'issued' | 'overdue' | 'returned';
}

@Component({
  selector: 'app-library-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './library-list.html',
  styleUrl: './library-list.css'
})
export class LibraryList {
 activeTab: 'books' | 'issues' = 'books';
  searchTerm: string = '';
  showAddBookForm: boolean = false;
  showIssueForm: boolean = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  categories = ['Nursing', 'Medical Laboratory', 'Physiotherapy', 'Radiology', 'Pharmacy', 'General Medicine'];

  books: Book[] = [
    {
      id: '1',
      isbn: '978-0-123456-78-9',
      title: 'Fundamentals of Nursing Practice',
      author: 'Patricia A. Potter',
      category: 'Nursing',
      totalCopies: 5,
      availableCopies: 3,
      status: 'available'
    },
    {
      id: '2',
      isbn: '978-0-987654-32-1',
      title: 'Clinical Laboratory Medicine',
      author: 'Michael L. Bishop',
      category: 'Medical Laboratory',
      totalCopies: 3,
      availableCopies: 0,
      status: 'issued'
    }
  ];

  bookIssues: BookIssue[] = [
    {
      id: '1',
      bookTitle: 'Clinical Laboratory Medicine',
      studentName: 'Rahul Kumar',
      studentId: 'CIPC001',
      issueDate: '2024-02-15',
      dueDate: '2024-03-15',
      status: 'issued'
    },
    {
      id: '2',
      bookTitle: 'Fundamentals of Nursing Practice',
      studentName: 'Priya Sharma',
      studentId: 'CIPC002',
      issueDate: '2024-01-20',
      dueDate: '2024-02-20',
      status: 'overdue'
    }
  ];

  get filteredBooks(): Book[] {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.isbn.includes(this.searchTerm)
    );
  }

  get filteredIssues(): BookIssue[] {
    return this.bookIssues.filter(issue =>
      issue.bookTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      issue.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      issue.studentId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedBooks(): Book[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBooks.slice(startIndex, endIndex);
  }

  get paginatedIssues(): BookIssue[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredIssues.slice(startIndex, endIndex);
  }

  get currentData() {
    return this.activeTab === 'books' ? this.filteredBooks : this.filteredIssues;
  }

  get paginatedData() {
    return this.activeTab === 'books' ? this.paginatedBooks : this.paginatedIssues;
  }

  get totalPages(): number {
    return Math.ceil(this.currentData.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.currentData.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  switchTab(tab: 'books' | 'issues') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  // Action button methods
  viewBook(book: Book) {
    console.log('View book:', book);
    // Implement view book functionality
  }

  editBook(book: Book) {
    console.log('Edit book:', book);
    // Implement edit book functionality
  }

  issueBook(book: Book) {
    console.log('Issue book:', book);
    this.showIssueForm = true;
  }

  deleteBook(bookId: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.books = this.books.filter(b => b.id !== bookId);
    }
  }

  returnBook(issueId: string) {
    console.log('Return book:', issueId);
    // Implement return book functionality
  }

  renewBook(issueId: string) {
    console.log('Renew book:', issueId);
    // Implement renew book functionality
  }

  viewFine(issueId: string) {
    console.log('View fine:', issueId);
    // Implement view fine functionality
  }
}
