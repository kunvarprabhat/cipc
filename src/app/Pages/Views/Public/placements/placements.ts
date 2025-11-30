import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PlacementCompany {
  id: number;
  name: string;
  logo: string;
  studentsPlaced: number;
  averageSalary: string;
}

interface PlacementStat {
  label: string;
  value: string;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-placements',
  imports: [CommonModule],
  templateUrl: './placements.html',
  styleUrls: ['./placements.css']
})
export class Placements {
  stats: PlacementStat[] = [
    { label: 'Placement Rate', value: '85%', icon: 'ri-award-line' },
    { label: 'Average Salary', value: '₹20,000/month', icon: 'ri-money-rupee-circle-line' },
    { label: 'Top Companies', value: '50+', icon: 'ri-building-line' },
    { label: 'Highest Salary', value: '₹40,000/month', icon: 'ri-star-line' }
  ];

  recruitingCompanies: PlacementCompany[] = [
    { id: 1, name: 'Apollo Hospitals', logo: '/Assets/logos/apollo.png', studentsPlaced: 120, averageSalary: '₹22,000' },
    { id: 2, name: 'Fortis Healthcare', logo: '/Assets/logos/fortis.png', studentsPlaced: 95, averageSalary: '₹21,000' },
    { id: 3, name: 'Max Healthcare', logo: '/Assets/logos/max.png', studentsPlaced: 85, averageSalary: '₹20,000' },
    { id: 4, name: 'Ranbaxy Diagnostics', logo: '/Assets/logos/ranbaxy.png', studentsPlaced: 70, averageSalary: '₹19,000' },
    { id: 5, name: 'Dr. Lal Path Labs', logo: '/Assets/logos/lalpathlabs.png', studentsPlaced: 65, averageSalary: '₹18,500' },
    { id: 6, name: 'SRL Diagnostics', logo: '/Assets/logos/srl.png', studentsPlaced: 60, averageSalary: '₹18,000' },
  ];

  jobRoles = [
    { role: 'Medical Lab Technician', demand: 'High', companies: '45+', salary: '₹15,000 - ₹28,000' },
    { role: 'X-Ray Technician', demand: 'High', companies: '38+', salary: '₹16,000 - ₹30,000' },
    { role: 'Operation Theater Technician', demand: 'Medium', companies: '32+', salary: '₹17,000 - ₹32,000' },
    { role: 'Nursing Assistant', demand: 'High', companies: '50+', salary: '₹15,000 - ₹25,000' },
    { role: 'Physiotherapy Technician', demand: 'Medium', companies: '28+', salary: '₹14,000 - ₹24,000' },
    { role: 'Hospital Coordinator', demand: 'Medium', companies: '35+', salary: '₹13,000 - ₹22,000' },
  ];

  successStories = [
    {
      name: 'Priya Sharma',
      course: 'MLT (Medical Laboratory Technology)',
      company: 'Apollo Hospitals',
      package: '₹22,000/month',
      feedback: 'CIPC gave me excellent training and confidence. The placement support was outstanding!'
    },
    {
      name: 'Rajesh Kumar',
      course: 'X-Ray Technician',
      company: 'Fortis Healthcare',
      package: '₹24,000/month',
      feedback: 'Best decision to join CIPC. My practical training prepared me perfectly for the job.'
    },
    {
      name: 'Anjali Patel',
      course: 'Operation Theater Technician',
      company: 'Max Healthcare',
      package: '₹26,000/month',
      feedback: 'Excellent faculty and infrastructure. Got placed even before graduation!'
    },
    {
      name: 'Vikram Singh',
      course: 'MLT',
      company: 'Dr. Lal Path Labs',
      package: '₹20,000/month',
      feedback: 'The industry-oriented curriculum at CIPC helped me crack the interview easily.'
    },
  ];
}
