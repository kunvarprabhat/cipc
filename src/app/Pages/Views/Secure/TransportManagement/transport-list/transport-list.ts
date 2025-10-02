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
  selector: 'app-transport-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './transport-list.html',
  styleUrl: './transport-list.css'
})
export class TransportList {
activeTab: 'routes' | 'students' | 'tracking' = 'routes';
  searchTerm: string = '';
  showAddRouteForm: boolean = false;
  showAllocateForm: boolean = false;

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

  toggleAddRouteForm() {
    this.showAddRouteForm = !this.showAddRouteForm;
  }

  toggleAllocateForm() {
    this.showAllocateForm = !this.showAllocateForm;
  }
}
