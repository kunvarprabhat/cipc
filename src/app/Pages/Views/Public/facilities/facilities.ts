import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Facility {
  id: number;
  name: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

@Component({
  standalone: true,
  selector: 'app-facilities',
  imports: [CommonModule],
  templateUrl: './facilities.html',
  styleUrls: ['./facilities.css']
})
export class Facilities {
  expandedId: number | null = null;

  facilities: Facility[] = [
    {
      id: 1,
      name: 'Medical Laboratory',
      description: 'State-of-the-art laboratory equipped with modern diagnostic equipment for hands-on training.',
      icon: 'ri-microscope-line',
      features: ['Microscopes', 'Centrifuges', 'Analyzer machines', 'Blood bank equipment', 'Culture media & reagents'],
      image: '/Assets/images/lab.jpg'
    },
    {
      id: 2,
      name: 'X-Ray Department',
      description: 'Modern X-ray facilities with latest imaging technology and safety protocols.',
      icon: 'ri-radio-line',
      features: ['Digital X-ray machines', 'Protective equipment', 'Image processing software', 'Safety training area', 'Radiation safety measures'],
      image: '/Assets/images/xray.jpg'
    },
    {
      id: 3,
      name: 'Operation Theater',
      description: 'Fully equipped OT with modern surgical instruments and sterilization facilities.',
      icon: 'ri-hospital-line',
      features: ['Surgical instruments', 'Sterilization chamber', 'Anesthesia equipment', 'Patient monitors', 'Emergency protocols training'],
      image: '/Assets/images/ot.jpg'
    },
    {
      id: 4,
      name: 'Nursing Lab',
      description: 'Comprehensive nursing care and patient simulation facilities.',
      icon: 'ri-nurse-line',
      features: ['Patient beds', 'Vital signs monitors', 'Mannequins for practice', 'IV & injection practice kits', 'Patient care simulation'],
      image: '/Assets/images/nursing.jpg'
    },
    {
      id: 5,
      name: 'Library',
      description: 'Extensive collection of medical books, journals, and digital resources.',
      icon: 'ri-book-line',
      features: ['Medical textbooks', 'Research journals', 'E-books & databases', 'Study areas', 'Computer terminals'],
      image: '/Assets/images/library.jpg'
    },
    {
      id: 6,
      name: 'Computer Lab',
      description: 'Advanced computing facility for digital learning and research.',
      icon: 'ri-computer-line',
      features: ['Latest computers', 'High-speed internet', 'Medical software', 'Projectors', 'Video conferencing setup'],
      image: '/Assets/images/computer-lab.jpg'
    },
    {
      id: 7,
      name: 'Cafeteria',
      description: 'Hygienic cafeteria with nutritious meals and refreshment facilities.',
      icon: 'ri-restaurant-2-line',
      features: ['Healthy meals', 'Vegetarian options', 'Clean environment', 'Seating area', 'Nutritious snacks'],
      image: '/Assets/images/cafeteria.jpg'
    },
    {
      id: 8,
      name: 'Sports & Recreation',
      description: 'Facilities for physical fitness and recreational activities.',
      icon: 'ri-football-line',
      features: ['Badminton court', 'Table tennis', 'Basketball court', 'Gym equipment', 'Recreation hall'],
      image: '/Assets/images/sports.jpg'
    }
  ];

  toggleFacility(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  isFacilityExpanded(id: number): boolean {
    return this.expandedId === id;
  }
}
