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
  @ViewChild('studentsBtn', { static: false }) studentsBtn!: ElementRef;
  
  isMenuOpen = false;
  loginModal = { isOpen: false, type: 'student' as LoginType };
  isAcademicFormsOpen = false;
  isAcademicFormsMobileOpen = false;
  isStudentsOpen = false;
  isStudentsMobileOpen = false;
  dropdownTop = 110;
  dropdownLeft = 200;
  studentsDropdownTop = 110;
  studentsDropdownLeft = 200;
  
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
    { name: 'Training Pattern', path: '/TrainingPattern' },
    { name: 'Our Achievements', path: '/OurAchievements' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Gallery', path: '/gallary' },
    { name: 'Affiliated Institutions', path: '/affiliated' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'News', path: '/news' }
  ];

  academicForms = [
    { name: 'Admission Form', path: '/forms/admission' },
    { name: 'Certification Form', path: '/forms/certification' },
    { name: 'Examination Form', path: '/forms/examination' },
  ];

  studentsMenu = [
    { name: 'Login to Student Portal', path: 'https://janhit.mgkvp.ac.in/Home/Login', icon: 'ri-login-box-line', isLogin: true, isExternal: true },
    { name: 'Admission', path: '/StudentHome/Admissions', icon: 'ri-file-add-line', isExternal: false },
    { name: 'Examination', path: '/StudentHome/Examination', icon: 'ri-file-list-3-line', isExternal: false },
    { name: 'Time-Table', path: '/StudentHome/TimeTable', icon: 'ri-calendar-line', isExternal: false },
    { name: 'Syllabus', path: '/StudentHome/Syllabus', icon: 'ri-book-open-line', isExternal: false },
    { name: 'Results', path: '/StudentHome/Results', icon: 'ri-award-line', isExternal: false },
    { name: 'e-Lectures', path: '/StudentHome/EContent', icon: 'ri-video-line', isExternal: false },
    { name: 'Right to Information (RTI)', path: '/StudentHome/RTI', icon: 'ri-information-line', isExternal: false },
    { name: 'Anti Ragging / Anti Ragging Squad Cell', path: '/FacilityHome/anti_ragging', icon: 'ri-shield-line', isExternal: false },
    { name: 'Hostels / Mess', path: '/StudentHome/Hostels_Mess', icon: 'ri-building-line', isExternal: false },
    { name: 'ICT', path: '/StudentHome/ICT', icon: 'ri-computer-line', isExternal: false },
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

  toggleStudents() {
    this.isStudentsOpen = !this.isStudentsOpen;
    if (this.isStudentsOpen) {
      setTimeout(() => {
        this.calculateStudentsDropdownPosition();
      }, 50);
    }
  }

  calculateStudentsDropdownPosition() {
    let button: HTMLElement | null = null;
    
    if (this.studentsBtn && this.studentsBtn.nativeElement) {
      button = this.studentsBtn.nativeElement;
    }
    
    if (!button) {
      const buttons = document.querySelectorAll('button[type="button"]');
      buttons.forEach((btn: any) => {
        if (btn.textContent && btn.textContent.includes('Students')) {
          button = btn;
        }
      });
    }
    
    if (!button) {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((btn: any) => {
        const icon = btn.querySelector('.ri-user-line');
        if (icon) {
          button = btn;
        }
      });
    }
    
    if (button) {
      const rect = button.getBoundingClientRect();
      this.studentsDropdownLeft = rect.left;
      this.studentsDropdownTop = rect.bottom + 8;
      
      const dropdown = document.querySelector('.students-dropdown') as HTMLElement;
      if (dropdown) {
        dropdown.style.left = this.studentsDropdownLeft + 'px';
        dropdown.style.top = this.studentsDropdownTop + 'px';
      }
    }
  }

  toggleStudentsMobile() {
    this.isStudentsMobileOpen = !this.isStudentsMobileOpen;
  }

  closeStudents() {
    this.isStudentsOpen = false;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    this.isAcademicFormsMobileOpen = false;
    this.isStudentsMobileOpen = false;
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
