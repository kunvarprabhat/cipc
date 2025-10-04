import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashBoardHeader } from '../dash-board-header/dash-board-header';
import { DashboardSidebar } from '../dashboard-sidebar/dashboard-sidebar';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterOutlet, DashboardSidebar, DashBoardHeader],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
 userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  activeModule = 'overview';

  setActiveModule(module: string) {
    this.activeModule = module;
}
}
