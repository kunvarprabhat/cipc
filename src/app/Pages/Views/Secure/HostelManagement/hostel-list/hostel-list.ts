import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  capacity: number;
  occupied: number;
  type: 'single' | 'shared' | 'dormitory';
  monthlyRent: number;
  status: 'available' | 'full' | 'maintenance';
}

interface Allocation {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  allocationDate: string;
  checkoutDate?: string;
  status: 'active' | 'checkout' | 'suspended';
}
@Component({
  selector: 'app-hostel-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './hostel-list.html',
  styleUrl: './hostel-list.css'
})
export class HostelList {
  activeTab: 'rooms' | 'allocations' = 'rooms';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  rooms: Room[] = [
    { id: '1', roomNumber: 'H101', floor: 1, capacity: 2, occupied: 2, type: 'shared', monthlyRent: 8000, status: 'full' },
    { id: '2', roomNumber: 'H102', floor: 1, capacity: 2, occupied: 1, type: 'shared', monthlyRent: 8000, status: 'available' },
    { id: '3', roomNumber: 'H201', floor: 2, capacity: 1, occupied: 1, type: 'single', monthlyRent: 12000, status: 'full' }
  ];

  allocations: Allocation[] = [
    { id: '1', studentId: 'CIPC001', studentName: 'Rahul Kumar', roomNumber: 'H101', allocationDate: '2024-01-15', status: 'active' },
    { id: '2', studentId: 'CIPC002', studentName: 'Priya Sharma', roomNumber: 'H101', allocationDate: '2024-01-20', status: 'active' },
    { id: '3', studentId: 'CIPC003', studentName: 'Amit Singh', roomNumber: 'H102', allocationDate: '2024-02-01', status: 'active' }
  ];

  showAddRoomForm = false;
  showAllocateForm = false;
  searchTerm = '';

  roomTypes = ['single', 'shared', 'dormitory'];

  get filteredRooms(): Room[] {
    return this.rooms.filter(room =>
      room.roomNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredAllocations(): Allocation[] {
    return this.allocations.filter(allocation =>
      allocation.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      allocation.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      allocation.roomNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalRooms(): number {
    return this.rooms.length;
  }

  get occupiedRooms(): number {
    return this.rooms.filter(room => room.occupied > 0).length;
  }

  get availableRooms(): number {
    return this.rooms.filter(room => room.status === 'available').length;
  }

  get totalCapacity(): number {
    return this.rooms.reduce((sum, room) => sum + room.capacity, 0);
  }

  get totalOccupied(): number {
    return this.rooms.reduce((sum, room) => sum + room.occupied, 0);
  }

  get paginatedRooms() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRooms.slice(startIndex, endIndex);
  }

  get paginatedAllocations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAllocations.slice(startIndex, endIndex);
  }

  get currentData() {
    return this.activeTab === 'rooms' ? this.filteredRooms : this.filteredAllocations;
  }

  get paginatedData() {
    return this.activeTab === 'rooms' ? this.paginatedRooms : this.paginatedAllocations;
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

  switchTab(tab: 'rooms' | 'allocations') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  // Action button methods
  viewRoom(room: Room) {
    console.log('View room:', room);
  }

  editRoom(room: Room) {
    console.log('Edit room:', room);
  }

  deleteRoom(roomId: string) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.rooms = this.rooms.filter(r => r.id !== roomId);
    }
  }

  viewAllocation(allocation: Allocation) {
    console.log('View allocation:', allocation);
  }

  editAllocation(allocation: Allocation) {
    console.log('Edit allocation:', allocation);
  }

  checkoutStudent(allocationId: string) {
    if (confirm('Are you sure you want to checkout this student?')) {
      const allocation = this.allocations.find(a => a.id === allocationId);
      if (allocation) {
        allocation.status = 'checkout';
        allocation.checkoutDate = new Date().toISOString().split('T')[0];
      }
    }
  }
}
