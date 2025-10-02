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
  imports: [CommonModule],
  templateUrl: './dash-board-header.html',
  styleUrl: './dash-board-header.css'
})
export class DashBoardHeader {

  @Input() user: UserInfo | null = null;
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}
