import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-affiliated',
  imports: [CommonModule],
  templateUrl: './affiliated.html',
  styleUrl: './affiliated.css'
})
export class Affiliated {
 affiliatedInstitutions = [
    {
      name: "City Medical Institute",
      location: "Varanasi, UP",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=500&fit=crop",
      courses: ["Medical Lab Technology", "X-Ray Technology", "OT Technology"],
      established: "2018",
      students: "150+"
    },
    {
      name: "Healthcare Training Center",
      location: "Allahabad, UP", 
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop",
      courses: ["Nursing", "Physiotherapy", "Medical Lab"],
      established: "2019",
      students: "200+"
    },
    {
      name: "Advanced Medical College",
      location: "Lucknow, UP",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop",
      courses: ["All Paramedical Courses", "Nursing", "Pharmacy"],
      established: "2020",
      students: "300+"
    },
    {
      name: "Regional Health Institute",
      location: "Gorakhpur, UP",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=500&fit=crop",
      courses: ["Medical Lab", "Radiology", "Emergency Medicine"],
      established: "2021",
      students: "120+"
    },
    {
      name: "Metropolitan Medical Academy",
      location: "Kanpur, UP",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop",
      courses: ["Paramedical Sciences", "Medical Technology"],
      established: "2022",
      students: "180+"
    },
    {
      name: "Excellence Health Sciences",
      location: "Agra, UP",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop",
      courses: ["Medical Lab", "OT Technology", "Radiology"],
      established: "2023",
      students: "100+"
    }
  ];

  benefits = [
    {
      icon: "ri-award-line",
      title: "Quality Assurance",
      description: "All affiliated institutes maintain CIPC's high educational standards"
    },
    {
      icon: "ri-graduation-cap-line",
      title: "Recognized Certification",
      description: "Certificates issued by CIPC Paramedical Council"
    },
    {
      icon: "ri-global-line",
      title: "Wide Network",
      description: "Access to opportunities across our institutional network"
    },
    {
      icon: "ri-shield-check-line",
      title: "Quality Control",
      description: "Regular audits and quality assessments"
    }
  ];
}
