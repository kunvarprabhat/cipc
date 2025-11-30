import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Scholarship {
  id: number;
  name: string;
  description: string;
  amount: string;
  eligibility: string[];
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-scholarships',
  imports: [CommonModule],
  templateUrl: './scholarships.html',
  styleUrls: ['./scholarships.css']
})
export class Scholarships {
  scholarships: Scholarship[] = [
    {
      id: 1,
      name: 'Merit Scholarship',
      description: 'Awarded to students based on their academic performance in entrance exam.',
      amount: '₹10,000 - ₹50,000 per year',
      eligibility: ['Minimum 80% in entrance exam', 'Valid 10+2 certificates', 'No other major scholarship holder'],
      icon: 'ri-award-line'
    },
    {
      id: 2,
      name: 'Need-Based Scholarship',
      description: 'Financial assistance for deserving students from economically weaker sections.',
      amount: '₹15,000 - ₹40,000 per year',
      eligibility: ['Annual family income < ₹2 lakhs', 'Merit in entrance', 'Income certificate required'],
      icon: 'ri-hand-heart-line'
    },
    {
      id: 3,
      name: 'SC/ST/OBC Scholarship',
      description: 'Reserved scholarship as per government guidelines for reserved categories.',
      amount: '₹20,000 - ₹60,000 per year',
      eligibility: ['SC/ST/OBC candidate', 'Valid caste certificate', 'Meets merit criteria'],
      icon: 'ri-flag-line'
    },
    {
      id: 4,
      name: 'Girl Child Scholarship',
      description: 'Special scholarship to encourage girl education in healthcare field.',
      amount: '₹15,000 - ₹45,000 per year',
      eligibility: ['Female candidate', 'Merit in entrance', 'Any category'],
      icon: 'ri-woman-line'
    },
    {
      id: 5,
      name: 'First Generation Learner Scholarship',
      description: 'For students whose parents have no formal education.',
      amount: '₹12,000 - ₹35,000 per year',
      eligibility: ['First in family to pursue higher education', 'Valid documentation', 'Merit criteria'],
      icon: 'ri-book-open-line'
    },
    {
      id: 6,
      name: 'Sports Excellence Scholarship',
      description: 'Recognizing talent in sports and physical fitness.',
      amount: '₹10,000 - ₹30,000 per year',
      eligibility: ['State/National sports player', 'Sports certificate', 'Merit criteria'],
      icon: 'ri-football-line'
    }
  ];

  processSteps = [
    { step: 1, title: 'Apply', description: 'Submit scholarship application form during admission' },
    { step: 2, title: 'Verify', description: 'Submit required documents for verification' },
    { step: 3, title: 'Assessment', description: 'Committee reviews applications and credentials' },
    { step: 4, title: 'Selection', description: 'Selected students are announced officially' },
    { step: 5, title: 'Disbursement', description: 'Scholarship amount credited to student account' }
  ];
}
