import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  paymentDate?: string;
}

@Component({
  standalone: true,
  selector: 'app-fees-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './fees-list.html',
  styleUrls: ['./fees-list.css']
})
export class FeesList {
 fees: Fee[] = [
    { id: '1', studentId: 'CIPC001', studentName: 'Rahul Kumar', feeType: 'Tuition Fee', amount: 25000, paidAmount: 25000, dueDate: '2024-01-15', paymentStatus: 'paid', paymentDate: '2024-01-10' },
    { id: '2', studentId: 'CIPC002', studentName: 'Priya Sharma', feeType: 'Hostel Fee', amount: 15000, paidAmount: 7500, dueDate: '2024-03-01', paymentStatus: 'partial' },
    { id: '3', studentId: 'CIPC003', studentName: 'Amit Singh', feeType: 'Library Fee', amount: 2000, paidAmount: 0, dueDate: '2024-02-15', paymentStatus: 'overdue' }
  ];

  showCollectForm = false;
  searchTerm = '';
  selectedStatus = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  feeTypes = ['Tuition Fee', 'Hostel Fee', 'Library Fee', 'Laboratory Fee', 'Examination Fee', 'Development Fee'];
  paymentStatuses = ['pending', 'partial', 'paid', 'overdue'];

  toggleCollectForm() {
    this.showCollectForm = !this.showCollectForm;
  }

  get filteredFees(): Fee[] {
    return this.fees.filter(fee => {
      const matchesSearch = fee.studentName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || fee.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || fee.paymentStatus === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  get paginatedFees(): Fee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFees.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFees.length / this.itemsPerPage);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredFees.length);
  }

  get totalAmount(): number {
    return this.fees.reduce((sum, fee) => sum + fee.amount, 0);
  }

  get totalPaid(): number {
    return this.fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  }

  get totalPending(): number {
    return this.totalAmount - this.totalPaid;
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  collectPayment(fee: Fee) {
    console.log('Collect payment for:', fee);
    this.showCollectForm = true;
  }

  viewReceipt(feeId: string) {
    console.log('View receipt for:', feeId);
    // Implement view receipt functionality
  }

  sendReminder(feeId: string) {
    console.log('Send reminder for:', feeId);
    // Implement send reminder functionality
  }

  viewHistory(feeId: string) {
    console.log('View payment history for:', feeId);
    // Implement view history functionality
  }
}
