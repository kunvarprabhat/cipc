import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface TimeTableEntry {
  id: number;
  particulars: string;
  date: string;
  pdfUrl: string;
  isNew: boolean;
}

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './time-table.html',
  styleUrls: ['./time-table.css']
})
export class TimeTable {
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 1100;

  timeTableEntries: TimeTableEntry[] = [
    { id: 1, particulars: 'Time Table 2025(Only Affiliated Colleges): M.A. Philosophy 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: true },
    { id: 2, particulars: 'Time Table 2025(Only Affiliated Colleges): M.A. Economics 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: true },
    { id: 3, particulars: 'Time Table 2025(Only Affiliated Colleges): M.A. Psychology 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: true },
    { id: 4, particulars: 'Time Table 2025(Only Affiliated Colleges): M.A. Sanskrit 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: true },
    { id: 5, particulars: 'Time Table(Main Campus/Gangapur/NTPC Campus): M.A. Sociology 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: true },
    { id: 6, particulars: 'Revised Time Table (Main Campus/Gangapur/NTPC Campus): M.A. Psychology 3rd Semester Exam 2025', date: '03/12/2025', pdfUrl: '#', isNew: false },
    { id: 7, particulars: 'B.A./B.Com./B.Sc. 3rd Semester Exam 2025-26 के लिए परीक्षा केंद्र और नोडल/संग्रह केंद्र', date: '02/12/2025', pdfUrl: '#', isNew: true },
    { id: 8, particulars: 'B.A./B.Com./B.Sc. 5th Semester Exam 2025-26 के लिए परीक्षा केंद्र और नोडल/संग्रह केंद्र', date: '02/12/2025', pdfUrl: '#', isNew: true },
    { id: 9, particulars: 'Revised Time Table (Main Campus/Gangapur/NTPC Campus): B.A. 3rd Semester Exam 2025', date: '02/12/2025', pdfUrl: '#', isNew: false },
    { id: 10, particulars: 'Revised Time Table (Main Campus/Gangapur/NTPC Campus): B.A. 5th Semester Exam 2025', date: '02/12/2025', pdfUrl: '#', isNew: false },
  ];

  get displayedEntries(): TimeTableEntry[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.timeTableEntries.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = Math.min(10, this.totalPages);
    for (let i = 1; i <= maxPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  getEndItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
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

  goToFirstPage() {
    this.currentPage = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  downloadPDF(url: string, particulars: string) {
    // In a real application, this would download the PDF
    // For now, we'll just open it in a new tab or show an alert
    if (url === '#') {
      alert(`Downloading PDF for: ${particulars}`);
    } else {
      window.open(url, '_blank');
    }
  }
}

