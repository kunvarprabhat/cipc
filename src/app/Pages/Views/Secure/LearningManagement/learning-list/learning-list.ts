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

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

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

  get filteredCoursesList() {
    return this.filteredCourses();
  }

  get filteredMaterialsList() {
    return this.filteredMaterials();
  }

  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCoursesList.slice(startIndex, endIndex);
  }

  get paginatedMaterials() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredMaterialsList.slice(startIndex, endIndex);
  }

  get currentData() {
    return this.activeTab === 'courses' ? this.filteredCoursesList : this.filteredMaterialsList;
  }

  get paginatedData() {
    return this.activeTab === 'courses' ? this.paginatedCourses : this.paginatedMaterials;
  }

  get totalPages(): number {
    return Math.ceil(this.currentData.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push(-1);
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push(-1);
      }
      pages.push(total);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearchOrFilterChange() {
    this.currentPage = 1;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.currentData.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  switchTab(tab: 'courses' | 'materials' | 'assignments') {
    this.activeTab = tab;
    this.currentPage = 1;
  }

  // Action button methods
  viewCourse(course: Course) {
    console.log('View course:', course);
  }

  editCourse(course: Course) {
    console.log('Edit course:', course);
  }

  deleteCourse(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courses = this.courses.filter(c => c.id !== courseId);
    }
  }

  viewMaterial(material: StudyMaterial) {
    console.log('View material:', material);
  }

  editMaterial(material: StudyMaterial) {
    console.log('Edit material:', material);
  }

  deleteMaterial(materialId: string) {
    if (confirm('Are you sure you want to delete this material?')) {
      this.materials = this.materials.filter(m => m.id !== materialId);
    }
  }

  downloadMaterial(material: StudyMaterial) {
    console.log('Download material:', material);
  }
}
