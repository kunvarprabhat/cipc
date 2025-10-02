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

  switchTab(tab: 'books' | 'issues') {
    this.activeTab = tab;
  }
}
