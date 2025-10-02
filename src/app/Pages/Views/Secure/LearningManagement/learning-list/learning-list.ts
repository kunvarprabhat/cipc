import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
interface Course {
  id: string;
  title: string;
  instructor: string;
  department: string;
  students: number;
  materials: number;
  assignments: number;
  status: 'active' | 'completed' | 'draft';
}

interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'ppt' | 'document';
  course: string;
  uploadDate: string;
  size: string;
  downloads: number;
}
@Component({
  selector: 'app-learning-list',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './learning-list.html',
  styleUrl: './learning-list.css'
})
export class LearningList {
activeTab: 'courses' | 'materials' | 'assignments' = 'courses';
  searchTerm = '';
  showUploadForm = false;
  showCourseForm = false;

  departments = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  materialTypes = ['pdf', 'video', 'ppt', 'document'];

  courses: Course[] = [
    {
      id: '1',
      title: 'Fundamentals of Nursing',
      instructor: 'Dr. Sunita Verma',
      department: 'Nursing',
      students: 45,
      materials: 12,
      assignments: 8,
      status: 'active'
    },
    {
      id: '2',
      title: 'Clinical Laboratory Medicine',
      instructor: 'Mr. Rajesh Kumar',
      department: 'Medical Laboratory Technology',
      students: 32,
      materials: 8,
      assignments: 5,
      status: 'active'
    }
  ];

  materials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Introduction to Nursing Principles',
      type: 'pdf',
      course: 'Fundamentals of Nursing',
      uploadDate: '2024-03-01',
      size: '2.5 MB',
      downloads: 156
    },
    {
      id: '2',
      title: 'Patient Care Techniques',
      type: 'video',
      course: 'Fundamentals of Nursing',
      uploadDate: '2024-02-28',
      size: '45.2 MB',
      downloads: 89
    },
    {
      id: '3',
      title: 'Laboratory Safety Guidelines',
      type: 'ppt',
      course: 'Clinical Laboratory Medicine',
      uploadDate: '2024-02-25',
      size: '8.1 MB',
      downloads: 67
    }
  ];

  filteredCourses() {
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filteredMaterials() {
    return this.materials.filter(material =>
      material.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      material.course.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getFileIcon(type: string) {
    switch(type) {
      case 'pdf': return 'ri-file-pdf-line';
      case 'video': return 'ri-video-line';
      case 'ppt': return 'ri-slideshow-line';
      default: return 'ri-file-text-line';
    }
  }

  getFileColor(type: string) {
    switch(type) {
      case 'pdf': return 'text-red-500';
      case 'video': return 'text-blue-500';
      case 'ppt': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  }
}
