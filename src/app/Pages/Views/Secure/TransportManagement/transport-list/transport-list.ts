import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface BusRoute {
  id: string;
  routeName: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  occupied: number;
  stops: string[];
  startTime: string;
  endTime: string;
  fee: number;
  status: 'active' | 'inactive' | 'maintenance';
}

interface Student {
  id: string;
  studentId: string;
  name: string;
  route: string;
  stop: string;
  feeStatus: 'paid' | 'pending' | 'overdue';
  phone: string;
}
@Component({
  standalone: true,
  selector: 'app-transport-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './transport-list.html',
  styleUrls: ['./transport-list.css']
})
export class TransportList {
activeTab: 'routes' | 'students' | 'tracking' = 'routes';
  searchTerm: string = '';
  showAddRouteForm: boolean = false;
  showAllocateForm: boolean = false;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  routes: BusRoute[] = [
    {
      id: '1',
      routeName: 'City Center Route',
      busNumber: 'MH-01-AB-1234',
      driverName: 'Ravi Sharma',
      driverPhone: '+91 9876543210',
      capacity: 50,
      occupied: 38,
      stops: ['Main Gate', 'City Center', 'Railway Station', 'Bus Stand', 'Market Square'],
      startTime: '07:30',
      endTime: '18:00',
      fee: 1200,
      status: 'active'
    },
    {
      id: '2',
      routeName: 'Suburb Route A',
      busNumber: 'MH-01-CD-5678',
      driverName: 'Amit Patel',
      driverPhone: '+91 9876543211',
      capacity: 40,
      occupied: 25,
      stops: ['Main Gate', 'Suburb A', 'Suburb B', 'Industrial Area'],
      startTime: '08:00',
      endTime: '17:30',
      fee: 800,
      status: 'active'
    }
  ];

  transportStudents: Student[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      name: 'Rahul Kumar',
      route: 'City Center Route',
      stop: 'Railway Station',
      feeStatus: 'paid',
      phone: '+91 9876543220'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      name: 'Priya Sharma',
      route: 'Suburb Route A',
      stop: 'Suburb A',
      feeStatus: 'pending',
      phone: '+91 9876543221'
    }
  ];

  get filteredRoutes() {
    return this.routes.filter(route =>
      route.routeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      route.busNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredStudents() {
    return this.transportStudents.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedRoutes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRoutes.slice(startIndex, endIndex);
  }

  get paginatedTransportStudents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, endIndex);
  }

  get currentData() {
    return this.activeTab === 'routes' ? this.filteredRoutes : this.filteredStudents;
  }

  get paginatedData() {
    return this.activeTab === 'routes' ? this.paginatedRoutes : this.paginatedTransportStudents;
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

  toggleAddRouteForm() {
    this.showAddRouteForm = !this.showAddRouteForm;
  }

  toggleAllocateForm() {
    this.showAllocateForm = !this.showAllocateForm;
  }

  switchTab(tab: 'routes' | 'students' | 'tracking') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  // Action button methods
  viewRoute(route: BusRoute) {
    console.log('View route:', route);
  }

  editRoute(route: BusRoute) {
    console.log('Edit route:', route);
  }

  deleteRoute(routeId: string) {
    if (confirm('Are you sure you want to delete this route?')) {
      this.routes = this.routes.filter(r => r.id !== routeId);
    }
  }

  viewStudent(student: Student) {
    console.log('View student:', student);
  }

  editAllocation(student: Student) {
    console.log('Edit allocation:', student);
  }

  removeAllocation(studentId: string) {
    if (confirm('Are you sure you want to remove this allocation?')) {
      this.transportStudents = this.transportStudents.filter(s => s.id !== studentId);
    }
  }

  collectFee(studentId: string) {
    console.log('Collect fee for:', studentId);
    // Implement collect fee functionality
  }

  sendSMS(studentId: string) {
    console.log('Send SMS to:', studentId);
    // Implement send SMS functionality
  }
}
