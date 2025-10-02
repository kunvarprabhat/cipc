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
      image: "https://readdy.ai/api/search-image?query=Modern%20medical%20college%20building&width=400&height=250",
      courses: ["Medical Lab Technology", "X-Ray Technology", "OT Technology"],
      established: "2018",
      students: "150+"
    },
    {
      name: "Healthcare Training Center",
      location: "Allahabad, UP", 
      image: "https://readdy.ai/api/search-image?query=Healthcare%20training%20facility%20building&width=400&height=250",
      courses: ["Nursing", "Physiotherapy", "Medical Lab"],
      established: "2019",
      students: "200+"
    },
    {
      name: "Advanced Medical College",
      location: "Lucknow, UP",
      image: "https://readdy.ai/api/search-image?query=Advanced%20medical%20college%20campus&width=400&height=250",
      courses: ["All Paramedical Courses", "Nursing", "Pharmacy"],
      established: "2020",
      students: "300+"
    },
    {
      name: "Regional Health Institute",
      location: "Gorakhpur, UP",
      image: "https://readdy.ai/api/search-image?query=Regional%20medical%20institute%20building&width=400&height=250",
      courses: ["Medical Lab", "Radiology", "Emergency Medicine"],
      established: "2021",
      students: "120+"
    },
    {
      name: "Metropolitan Medical Academy",
      location: "Kanpur, UP",
      image: "https://readdy.ai/api/search-image?query=Metropolitan%20medical%20academy%20building&width=400&height=250",
      courses: ["Paramedical Sciences", "Medical Technology"],
      established: "2022",
      students: "180+"
    },
    {
      name: "Excellence Health Sciences",
      location: "Agra, UP",
      image: "https://readdy.ai/api/search-image?query=Excellence%20health%20sciences%20institute&width=400&height=250",
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
