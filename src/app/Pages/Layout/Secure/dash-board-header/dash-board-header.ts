import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface UserInfo {
  name: string;
  role: string;
  email: string;
  loginType: string;
}

@Component({
  selector: 'app-dash-board-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-board-header.html',
  styleUrls: ['./dash-board-header.css']
})
export class DashBoardHeader {

  @Input() user: UserInfo | null = null;

  // Sidebar, Menu, Notifications
  isSidebarOpen = false;
  isMenuOpen = false;
  isNotificationOpen = false;
  unreadCount = 5;

  // Active module for sidebar highlight
  activeModule: string = 'overview';

  // Example menu items
  menuItems = [
    { id: 'overview', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'students', label: 'Students', icon: 'ri-graduation-cap-line' },
    { id: 'faculty', label: 'Faculty', icon: 'ri-user-star-line' },
    { id: 'courses', label: 'Courses', icon: 'ri-book-open-line' },
  ];

  // Example notifications
  notifications = Array.from({ length: 16 }).map((_, i) => ({
    message: `Notification ${i + 1}`,
    time: `${i + 1} min ago`,
    icon: 'ri-information-line',
    color: 'blue'
  }));

  constructor(private router: Router) { }

  toggleMobileSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isNotificationOpen = false; // close notifications if menu opens
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.isMenuOpen = false; // close profile menu if notifications open
  }

  setActiveModule(id: string) {
    this.activeModule = id;
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }

  getRoleColor(): string {
    if (!this.user || !this.user.loginType) return 'text-gray-600 bg-gray-50';
    switch (this.user.loginType) {
      case 'student': return 'text-green-600 bg-green-50';
      case 'teacher': return 'text-purple-600 bg-purple-50';
      case 'affiliation': return 'text-orange-600 bg-orange-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  }
}
