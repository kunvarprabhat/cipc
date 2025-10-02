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
}
