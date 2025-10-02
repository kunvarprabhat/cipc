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
  selector: 'app-fees-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './fees-list.html',
  styleUrl: './fees-list.css'
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

  get totalAmount(): number {
    return this.fees.reduce((sum, fee) => sum + fee.amount, 0);
  }

  get totalPaid(): number {
    return this.fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  }

  get totalPending(): number {
    return this.totalAmount - this.totalPaid;
  }
}
