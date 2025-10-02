import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface UserInfo {
  name: string;
  role: string;
  loginType: 'student' | 'admin' | 'teacher' | 'affiliation';
  email: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-sidebar.html',
  styleUrls: ['./dashboard-sidebar.css']
})




export class DashboardSidebar {
  @Input() activeModule!: string;
  @Input() userRole!: string;
  @Input() userInfo!: UserInfo;
  @Input() setActiveModule!: (module: string) => void;

  menuItems: MenuItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'ri-dashboard-line', roles: ['admin', 'teacher', 'student', 'affiliation'] },
    { id: 'students', label: 'Student Management', icon: 'ri-graduation-cap-line', roles: ['admin', 'teacher', 'affiliation'] },
    { id: 'faculty', label: 'Faculty Management', icon: 'ri-user-star-line', roles: ['admin'] },
    { id: 'courses', label: 'Course Management', icon: 'ri-book-open-line', roles: ['admin', 'teacher', 'student'] },
    { id: 'attendance', label: 'Attendance Management', icon: 'ri-calendar-check-line', roles: ['admin', 'teacher', 'student'] },
    { id: 'leave', label: 'Leave Management', icon: 'ri-calendar-todo-line', roles: ['admin', 'teacher', 'student'] },
    { id: 'exams', label: 'Exam Management', icon: 'ri-file-list-3-line', roles: ['admin', 'teacher', 'student', 'affiliation'] },
    { id: 'fees', label: 'Fees Management', icon: 'ri-money-dollar-circle-line', roles: ['admin', 'student'] },
    { id: 'library', label: 'Library Management', icon: 'ri-book-line', roles: ['admin', 'teacher', 'student'] },
    { id: 'lms', label: 'Learning Management', icon: 'ri-graduation-cap-fill', roles: ['admin', 'teacher', 'student'] },
    { id: 'hostel', label: 'Hostel Management', icon: 'ri-home-line', roles: ['admin', 'student'] },
    { id: 'transport', label: 'Transport Management', icon: 'ri-bus-line', roles: ['admin', 'student'] },
    { id: 'events', label: 'Events & Communication', icon: 'ri-calendar-event-line', roles: ['admin', 'teacher', 'student', 'affiliation'] },
    { id: 'alumni', label: 'Alumni Management', icon: 'ri-group-line', roles: ['admin', 'affiliation'] },
    { id: 'reports', label: 'Reports & Analytics', icon: 'ri-bar-chart-line', roles: ['admin', 'teacher', 'affiliation'] }
  ];

  get filteredMenuItems() {
    return this.menuItems.filter(item => item.roles.includes(this.userRole));
  }

  getRoleColor(): string {
    switch (this.userInfo.loginType) {
      case 'student': return 'text-green-600 bg-green-50';
      case 'teacher': return 'text-purple-600 bg-purple-50';
      case 'affiliation': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  }

  handleLogout() {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  }
}
