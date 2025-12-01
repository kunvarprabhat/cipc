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
  isAcademicFormsOpen = false;
  isAcademicFormsMobileOpen = false;

  navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Team', path: '/teams' },
    { name: 'About Us', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Placements', path: '/placements' },
    { name: 'Scholarships', path: '/scholarships' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'Training Pattern', path: '/Training Pattern' },
    { name: 'Our Achievements', path: '/Our Achievements' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallary' },
    { name: 'Affiliated Institutions', path: '/affiliated' },
    { name: 'Contact Us', path: '/contact' },
    {nam:'News', path:'/news'}
  ];

  academicForms = [
    { name: 'Admission Form', path: '/forms/admission' },
    { name: 'Certification Form', path: '/forms/certification' },
    { name: 'Examination Form', path: '/forms/examination' },
  ];

  toggleAcademicForms() {
    this.isAcademicFormsOpen = !this.isAcademicFormsOpen;
  }

  toggleAcademicFormsMobile() {
    this.isAcademicFormsMobileOpen = !this.isAcademicFormsMobileOpen;
  }

  closeAcademicForms() {
    this.isAcademicFormsOpen = false;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.isAcademicFormsMobileOpen = false;
  }

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
