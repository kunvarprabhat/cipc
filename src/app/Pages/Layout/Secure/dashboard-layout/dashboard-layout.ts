import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashBoardHeader } from '../dash-board-header/dash-board-header';
import { DashboardSidebar } from '../dashboard-sidebar/dashboard-sidebar';

interface UserInfo {
  name?: string;
  role?: string;
  loginType?: 'student' | 'admin' | 'teacher' | 'affiliation';
  email?: string;
}

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, DashboardSidebar, DashBoardHeader],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
  userInfo: UserInfo | null = (() => {
    const stored = localStorage.getItem('userInfo');
    return stored ? JSON.parse(stored) : null;
  })();

  activeModule = 'overview';

  setActiveModule(module: string) {
    this.activeModule = module;
}
}
