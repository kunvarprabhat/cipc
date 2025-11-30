import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NgForOf],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  currentYear: number = new Date().getFullYear();

  quickLinks = [
    { name: 'Home', path: '/home', icon: 'ri-home-line' },
    { name: 'About Us', path: '/about', icon: 'ri-information-line' },
    { name: 'Admissions', path: '/admissions', icon: 'ri-file-edit-line' },
    { name: 'Facilities', path: '/facilities', icon: 'ri-building-line' },
    { name: 'Placements', path: '/placements', icon: 'ri-briefcase-line' },
    { name: 'Scholarships', path: '/scholarships', icon: 'ri-gift-line' },
    { name: 'Student Life', path: '/student-life', icon: 'ri-team-line' },
    { name: 'Our Team', path: '/teams', icon: 'ri-user-heart-line' },
    { name: 'Courses', path: '/courses', icon: 'ri-book-line' },
    { name: 'Training Pattern', path: '/Training Pattern', icon: 'ri-presentation-line' },
    { name: 'Our Achievements', path: '/Our Achievements', icon: 'ri-award-line' },
    { name: 'Gallery', path: '/gallary', icon: 'ri-gallery-line' },
    { name: 'Affiliated', path: '/affiliated', icon: 'ri-links-line' },
    { name: 'FAQ', path: '/faq', icon: 'ri-question-line' },
    { name: 'Contact', path: '/contact', icon: 'ri-phone-line' }
  ];

  courses = [
    { name: 'MLT (Medical Laboratory Technology)', path: '/courses', icon: 'ri-microscope-line' },
    { name: 'X-Ray Technician', path: '/courses', icon: 'ri-radio-line' },
    { name: 'Operation Theater Technician', path: '/courses', icon: 'ri-hospital-line' },
    { name: 'Nursing & Healthcare', path: '/courses', icon: 'ri-nurse-line' }
  ];

  socialLinks = [
    { icon: 'ri-facebook-fill', title: 'Facebook', url: '#', color: 'hover:text-blue-400' },
    { icon: 'ri-twitter-x-fill', title: 'X (Twitter)', url: '#', color: 'hover:text-gray-300' },
    { icon: 'ri-instagram-fill', title: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: 'ri-linkedin-fill', title: 'LinkedIn', url: '#', color: 'hover:text-blue-300' },
    { icon: 'ri-youtube-fill', title: 'YouTube', url: '#', color: 'hover:text-red-400' }
  ];

  legalLinks = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms & Conditions', path: '#' },
    { name: 'Disclaimer', path: '#' }
  ];
}
