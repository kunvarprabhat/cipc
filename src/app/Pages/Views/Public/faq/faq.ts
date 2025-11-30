import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class FAQ {
  expandedId: number | null = null;

  faqItems: FAQItem[] = [
    // Admissions
    {
      id: 1,
      category: 'Admissions',
      question: 'What are the eligibility criteria for admission?',
      answer: 'Candidates should have completed their 10+2 (Science stream) from a recognized board with a minimum of 50% aggregate marks. Age should be between 17-35 years.',
      icon: 'ri-file-edit-line'
    },
    {
      id: 2,
      category: 'Admissions',
      question: 'What is the admission process?',
      answer: 'The admission process involves: 1) Online/offline application, 2) Document verification, 3) Merit-based selection, and 4) Final enrollment. We encourage early applications as seats are limited.',
      icon: 'ri-file-list-3-line'
    },
    {
      id: 3,
      category: 'Admissions',
      question: 'What documents are required for admission?',
      answer: 'Required documents include: 10th and 12th mark sheets, transfer certificate, birth certificate, identity proof (Aadhar/PAN), medical fitness certificate, and passport-size photographs (4x6 cm).',
      icon: 'ri-file-line'
    },
    {
      id: 4,
      category: 'Admissions',
      question: 'Is there a reservation policy?',
      answer: 'Yes, we follow government reservation policies for SC/ST/OBC categories as per state and national guidelines. Candidates should provide necessary certificates at the time of admission.',
      icon: 'ri-flag-line'
    },
    {
      id: 5,
      category: 'Admissions',
      question: 'When do admissions open?',
      answer: 'Admissions typically open in June-July for courses starting in the new academic year. We also have provisions for admissions in January for some programs. Check our website for exact dates.',
      icon: 'ri-calendar-line'
    },

    // Courses
    {
      id: 6,
      category: 'Courses',
      question: 'What courses does CIPC offer?',
      answer: 'CIPC offers various paramedical courses including MLT (Medical Laboratory Technology), X-Ray Technician, Operation Theater Technician, Nursing, Physiotherapy, and other allied healthcare programs.',
      icon: 'ri-book-line'
    },
    {
      id: 7,
      category: 'Courses',
      question: 'What is the duration of the courses?',
      answer: 'Most of our courses are 2-year diploma programs. Some specialized courses may be of 1-year or 3-year duration. The exact duration depends on the specific course and affiliation guidelines.',
      icon: 'ri-time-line'
    },
    {
      id: 8,
      category: 'Courses',
      question: 'Are the courses recognized?',
      answer: 'Yes, all our courses are affiliated with recognized state and national bodies. Our diplomas are recognized across India and provide valid qualifications for employment in healthcare sectors.',
      icon: 'ri-checkbox-circle-line'
    },
    {
      id: 9,
      category: 'Courses',
      question: 'Can I pursue courses online?',
      answer: 'Paramedical courses require practical training and hands-on experience in hospitals/labs. While some theoretical components may have online options, the programs are primarily classroom and practical-based.',
      icon: 'ri-computer-line'
    },

    // Placements
    {
      id: 10,
      category: 'Placements',
      question: 'What is the placement record of CIPC?',
      answer: 'CIPC has a strong placement track record with 85%+ students getting placed in leading hospitals, clinics, diagnostic centers, and healthcare organizations across India.',
      icon: 'ri-briefcase-line'
    },
    {
      id: 11,
      category: 'Placements',
      question: 'Which organizations recruit from CIPC?',
      answer: 'Top hospitals, diagnostic centers, and healthcare organizations across India recruit from CIPC. These include government hospitals, private chains, and diagnostic centers.',
      icon: 'ri-building-line'
    },
    {
      id: 12,
      category: 'Placements',
      question: 'Is there a placement assistance after graduation?',
      answer: 'Yes, CIPC provides comprehensive placement assistance including resume building, interview training, and job placement support. Our placement cell maintains connections with various healthcare organizations.',
      icon: 'ri-hand-heart-line'
    },
    {
      id: 13,
      category: 'Placements',
      question: 'What is the average salary of graduates?',
      answer: 'The average starting salary for our graduates ranges from ₹15,000 to ₹25,000 per month depending on the course, location, and organization. Senior positions offer significantly higher packages.',
      icon: 'ri-money-rupee-circle-line'
    },

    // Fees & Financial Aid
    {
      id: 14,
      category: 'Fees',
      question: 'What is the fee structure?',
      answer: 'Course fees vary based on the program. For detailed information on fee structure, payment plans, and installment options, please visit our admissions office or contact us directly.',
      icon: 'ri-coin-line'
    },
    {
      id: 15,
      category: 'Fees',
      question: 'Are there scholarships available?',
      answer: 'Yes, CIPC offers merit-based scholarships for deserving students. Additionally, students may be eligible for government scholarships and financial aid schemes based on their category and performance.',
      icon: 'ri-gift-line'
    },
    {
      id: 16,
      category: 'Fees',
      question: 'Can I pay fees in installments?',
      answer: 'Yes, we provide flexible payment options including installment plans. Students can discuss their financial needs with our admissions office to arrange suitable payment schedules.',
      icon: 'ri-bank-card-line'
    },

    // Hostel & Facilities
    {
      id: 17,
      category: 'Facilities',
      question: 'Does CIPC provide hostel facilities?',
      answer: 'Yes, CIPC provides separate boys and girls hostel facilities with modern amenities including furnished rooms, 24/7 security, healthy meals, study areas, and recreational facilities.',
      icon: 'ri-home-line'
    },
    {
      id: 18,
      category: 'Facilities',
      question: 'What facilities are available on campus?',
      answer: 'Our campus is equipped with modern laboratory facilities, well-stocked library, computer lab, auditorium, sports facilities, cafeteria, and recreational areas. All facilities are regularly maintained.',
      icon: 'ri-building-3-line'
    },
    {
      id: 19,
      category: 'Facilities',
      question: 'Is there a transportation facility?',
      answer: 'Yes, CIPC provides transportation facilities from various parts of the city. We have buses that cover major routes. Detailed information about routes and costs is available upon inquiry.',
      icon: 'ri-bus-line'
    },

    // After Graduation
    {
      id: 20,
      category: 'After Graduation',
      question: 'What are my career options after graduation?',
      answer: 'Graduates can work in hospitals, diagnostic centers, research labs, pharmaceutical companies, ambulance services, or start their own practice. Many pursue higher education and specialized certifications.',
      icon: 'ri-rocket-2-line'
    },
    {
      id: 21,
      category: 'After Graduation',
      question: 'Can I pursue higher education after the diploma?',
      answer: 'Yes, diploma holders can pursue Bachelor\'s degree, specialized certifications, or skill enhancement programs. Many universities offer lateral entry for diploma holders into degree programs.',
      icon: 'ri-graduation-cap-line'
    },
    {
      id: 22,
      category: 'After Graduation',
      question: 'Is it possible to work abroad after graduation?',
      answer: 'Yes, our qualifications are internationally recognized. Students can work in various countries. CIPC provides guidance on international eligibility requirements and certifications needed.',
      icon: 'ri-global-line'
    }
  ];

  categories = ['All', 'Admissions', 'Courses', 'Placements', 'Fees', 'Facilities', 'After Graduation'];
  selectedCategory = 'All';

  get filteredFAQ(): FAQItem[] {
    if (this.selectedCategory === 'All') {
      return this.faqItems;
    }
    return this.faqItems.filter(item => item.category === this.selectedCategory);
  }

  toggleFAQ(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  isFAQExpanded(id: number): boolean {
    return this.expandedId === id;
  }
}
