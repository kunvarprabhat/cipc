import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Activity {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-student-life',
  imports: [CommonModule],
  templateUrl: './student-life.html',
  styleUrls: ['./student-life.css']
})
export class StudentLife {
  expandedCategory: string | null = null;

  activities: Activity[] = [
    {
      id: 1,
      title: 'Cultural Fest',
      description: 'Annual celebration showcasing diverse cultures, music, dance, and food from across India.',
      category: 'Events',
      icon: 'ri-music-2-line',
      image: '/Assets/images/cultural-fest.jpg'
    },
    {
      id: 2,
      title: 'Sports Day',
      description: 'Inter-class sports competition including athletics, badminton, basketball, and team events.',
      category: 'Sports',
      icon: 'ri-football-line',
      image: '/Assets/images/sports-day.jpg'
    },
    {
      id: 3,
      title: 'Medical Camp',
      description: 'Regular health checkup camps for underprivileged communities organized by students.',
      category: 'Social Service',
      icon: 'ri-hospital-line',
      image: '/Assets/images/medical-camp.jpg'
    },
    {
      id: 4,
      title: 'Seminar & Workshops',
      description: 'Expert-led seminars on latest medical trends, techniques, and professional development.',
      category: 'Educational',
      icon: 'ri-presentation-line',
      image: '/Assets/images/seminar.jpg'
    },
    {
      id: 5,
      title: 'Blood Donation Drive',
      description: 'Organized blood donation camps to support local hospitals and blood banks.',
      category: 'Community Service',
      icon: 'ri-heart-line',
      image: '/Assets/images/blood-donation.jpg'
    },
    {
      id: 6,
      title: 'Student Council',
      description: 'Democratic platform for student leadership and representation in college activities.',
      category: 'Leadership',
      icon: 'ri-user-heart-line',
      image: '/Assets/images/student-council.jpg'
    },
    {
      id: 7,
      title: 'Study Groups',
      description: 'Peer learning groups for collaborative studying and knowledge sharing.',
      category: 'Academics',
      icon: 'ri-team-line',
      image: '/Assets/images/study-group.jpg'
    },
    {
      id: 8,
      title: 'Industry Visits',
      description: 'Regular visits to hospitals, diagnostic centers, and pharmaceutical companies.',
      category: 'Career Development',
      icon: 'ri-roadmap-line',
      image: '/Assets/images/industry-visit.jpg'
    },
    {
      id: 9,
      title: 'Tech Club',
      description: 'Club for technology enthusiasts focusing on medical technology and digital health.',
      category: 'Clubs & Societies',
      icon: 'ri-computer-line',
      image: '/Assets/images/tech-club.jpg'
    }
  ];

  categories = ['All', 'Events', 'Sports', 'Social Service', 'Community Service', 'Leadership', 'Academics', 'Career Development', 'Educational', 'Clubs & Societies'];
  selectedCategory = 'All';

  get filteredActivities(): Activity[] {
    if (this.selectedCategory === 'All') {
      return this.activities;
    }
    return this.activities.filter(a => a.category === this.selectedCategory);
  }

  testimonials = [
    {
      name: 'Sneha Gupta',
      batch: '2024',
      quote: 'CIPC gave me incredible memories and friendships. The student life here is vibrant and enriching!'
    },
    {
      name: 'Arjun Verma',
      batch: '2024',
      quote: 'From sports to cultural events to community service, every moment at CIPC was meaningful.'
    },
    {
      name: 'Divya Singh',
      batch: '2023',
      quote: 'The hostel life and campus activities helped me grow as a person beyond just academics.'
    },
    {
      name: 'Rohit Sharma',
      batch: '2023',
      quote: 'Best decision to choose CIPC. The complete student experience was exceptional!'
    }
  ];

  toggleCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? 'All' : category;
  }
}
