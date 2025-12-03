import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from '../login/login';

type LoginType = 'student' | 'admin' | 'teacher' | 'affiliation';

@Component({
  selector: 'app-header',
  standalone: true,  // ✅ standalone component
  imports: [    CommonModule,    FormsModule, ReactiveFormsModule, RouterModule, Login     ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']   
})
export class Header implements AfterViewInit {
  @ViewChild('academicFormsBtn', { static: false }) academicFormsBtn!: ElementRef;
  
  isMenuOpen = false;
  loginModal = { isOpen: false, type: 'student' as LoginType };
  isAcademicFormsOpen = false;
  isAcademicFormsMobileOpen = false;
  dropdownTop = 110;
  dropdownLeft = 200;
  
  ngAfterViewInit() {
    // Component initialized
  }

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
    if (this.isAcademicFormsOpen) {
      // Calculate position after a small delay to ensure DOM is updated
      setTimeout(() => {
        this.calculateDropdownPosition();
      }, 50);
    }
  }

  calculateDropdownPosition() {
    // Try multiple methods to find the button
    let button: HTMLElement | null = null;
    
    // Method 1: Use ViewChild reference
    if (this.academicFormsBtn && this.academicFormsBtn.nativeElement) {
      button = this.academicFormsBtn.nativeElement;
    }
    
    // Method 2: Find by text content
    if (!button) {
      const buttons = document.querySelectorAll('button[type="button"]');
      buttons.forEach((btn: any) => {
        if (btn.textContent && (btn.textContent.includes('Academic Forms') || btn.textContent.includes('Forms'))) {
          button = btn;
        }
      });
    }
    
    // Method 3: Find by icon class
    if (!button) {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn: any) => {
        const icon = btn.querySelector('.ri-file-list-3-line');
        if (icon) {
          button = btn;
        }
      });
    }
    
    if (button) {
      const rect = button.getBoundingClientRect();
      // For fixed positioning, use viewport coordinates directly (no scroll offset needed)
      this.dropdownLeft = rect.left;
      this.dropdownTop = rect.bottom + 8; // 8px margin below button
      
      // Apply position to dropdown element via CSS
      const dropdown = document.querySelector('.academic-forms-dropdown') as HTMLElement;
      if (dropdown) {
        dropdown.style.left = this.dropdownLeft + 'px';
        dropdown.style.top = this.dropdownTop + 'px';
      }
    }
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
