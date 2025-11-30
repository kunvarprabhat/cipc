import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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
    route: string;   // ✅ नया field
}

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard-sidebar.html',
  styleUrls: ['./dashboard-sidebar.css']
})




export class DashboardSidebar implements OnInit {
  @Input() activeModule!: string;
  @Input() userRole!: string;
  @Input() userInfo!: UserInfo;
  @Input() setActiveModule!: (module: string) => void;

  isMobileSidebarOpen = false;
  isMobile = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if mobile on init and window resize
    this.checkMobile();
    window.addEventListener('resize', () => this.checkMobile());
    
    // Listen for sidebar toggle from header
    window.addEventListener('toggleSidebar', () => {
      this.toggleMobileSidebar();
    });
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 1024; // lg breakpoint
    if (!this.isMobile) {
      this.isMobileSidebarOpen = false;
    }
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  menuItems: MenuItem[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: 'ri-dashboard-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route: '/dashboard'  },
    { id: 'students', label: 'Student Management', icon: 'ri-graduation-cap-line',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/students' },
    { id: 'faculty', label: 'Faculty Management', icon: 'ri-user-star-line',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/faculty' },
    { id: 'courses', label: 'Course Management', icon: 'ri-book-open-line',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/courses/manage' },
    { id: 'attendance', label: 'Attendance Management', icon: 'ri-calendar-check-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/attendance' },
    { id: 'leave', label: 'Leave Management', icon: 'ri-calendar-todo-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/leave' },
    { id: 'exams', label: 'Exam Management', icon: 'ri-file-list-3-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/exams' },
    { id: 'fees', label: 'Fees Management', icon: 'ri-money-dollar-circle-line',  roles: ['admin', 'teacher', 'student', 'affiliation']  ,route:'/fees' },
    { id: 'library', label: 'Library Management', icon: 'ri-book-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/library' },
    { id: 'lms', label: 'Learning Management', icon: 'ri-graduation-cap-fill',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/lms' },
    { id: 'hostel', label: 'Hostel Management', icon: 'ri-home-line', roles: ['admin', 'teacher', 'student', 'affiliation'] ,route:'/hostel' },
    { id: 'transport', label: 'Transport Management', icon: 'ri-bus-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/transport'  },
    { id: 'events', label: 'Events & Communication', icon: 'ri-calendar-event-line', roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/events'  },
    { id: 'alumni', label: 'Alumni Management', icon: 'ri-group-line',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/alumni'  },
    { id: 'reports', label: 'Reports & Analytics', icon: 'ri-bar-chart-line',  roles: ['admin', 'teacher', 'student', 'affiliation'],route:'/reports'  }
  ];

  // get filteredMenuItems() {
  //   return this.menuItems.filter(item => item.roles.includes(this.userRole));
  // }
   // बिना role validation के सभी items दिखाएं
  get filteredMenuItems() {
    return this.menuItems; // अब सभी menu items दिखेंगे
  } 

  
  getRoleColor(): string {
  if (!this.userInfo || !this.userInfo.loginType) {
    return 'text-gray-600 bg-gray-50'; // default color
  }

  switch (this.userInfo.loginType) {
    case 'student': return 'text-green-600 bg-green-50';
    case 'teacher': return 'text-purple-600 bg-purple-50';
    case 'affiliation': return 'text-orange-600 bg-orange-50';
    default: return 'text-blue-600 bg-blue-50';
  }
}



  handleLogout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.checkMobile());
    window.removeEventListener('toggleSidebar', () => {});
  }
}
