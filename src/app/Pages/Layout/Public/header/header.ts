import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';

type LoginType = 'student' | 'admin' | 'teacher' | 'affiliation';

@Component({
  selector: 'app-header',
  standalone: true,  // ✅ standalone component
  imports: [    CommonModule,    FormsModule, ReactiveFormsModule, RouterModule,    Login     ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']   
})
export class Header {
  isMenuOpen = false;
  loginModal = { isOpen: false, type: 'student' as LoginType };

  navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Training Pattern', path: '/training' },
    { name: 'Our Achievements', path: '/achievements' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Affiliated Institutions', path: '/affiliated' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Student Verification', path: '/verification' },
    
  ];

  openLogin(type: LoginType) {
    this.loginModal.isOpen = true;
    this.loginModal.type = type;
  }

  closeLogin() {
    this.loginModal.isOpen = false;
    this.loginModal.type = 'student';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
