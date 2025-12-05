import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../../../Services/shared-service/application-user';

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
export class DashBoardHeader implements OnInit {
  @Input() user: UserInfo | null = null;

  // Menu, Notifications
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

  constructor(
    private router: Router,
    private _appuser: ApplicationUser
  ) { }

  ngOnInit() {
    // Get user info from localStorage if not provided via Input
    if (!this.user) {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        this.user = JSON.parse(userInfo);
      }
    }
  }

  toggleMobileSidebar() {
    // Dispatch event to toggle sidebar in dashboard-sidebar component
    window.dispatchEvent(new Event('toggleSidebar'));
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
    this._appuser.logout();
    this.router.navigate(['/home']);
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
