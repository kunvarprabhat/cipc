import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css'
})
export class DashboardOverview {
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
}

