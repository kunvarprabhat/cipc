import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  program: string;
  semester: number;
  admissionDate: string;
  phone: string;
  status: 'active' | 'inactive';
}
@Component({
  standalone: true,
  selector: 'app-student-list',
  imports: [FormsModule,CommonModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentList {
students: Student[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@student.cipc.edu',
      department: 'Nursing',
      program: 'UG',
      semester: 6,
      admissionDate: '2022-07-15',
      phone: '+91 9876543210',
      status: 'active'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      name: 'Priya Sharma',
      email: 'priya.sharma@student.cipc.edu',
      department: 'Medical Laboratory Technology',
      program: 'Diploma',
      semester: 4,
      admissionDate: '2023-01-10',
      phone: '+91 9876543211',
      status: 'active'
    }
  ];

  activeTab: 'students' | 'admissions' | 'results' | 'certificates' = 'students';
  showAddForm: boolean = false;
  searchTerm: string = '';
  selectedDepartment: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  departments: string[] = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  programs: string[] = ['UG', 'PG', 'Diploma', 'Certification'];

  // Admission List Data
  admissions: any[] = [
    {
      id: '1',
      enrolmentNumber: 'CIPC-2024-0315-12345',
      name: 'Rahul Kumar',
      course: 'Nursing',
      admissionDate: '2024-01-15',
      status: 'approved',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      enrolmentNumber: 'CIPC-2024-0316-12346',
      name: 'Priya Sharma',
      course: 'Medical Laboratory Technology',
      admissionDate: '2024-01-20',
      status: 'pending',
      paymentStatus: 'pending'
    }
  ];

  // Result List Data (summary)
  studentResults: any[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      studentName: 'Rahul Kumar',
      course: 'Nursing',
      semester: 6,
      averagePercentage: 85,
      status: 'pass'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      studentName: 'Priya Sharma',
      course: 'Medical Laboratory Technology',
      semester: 4,
      averagePercentage: 72,
      status: 'pass'
    }
  ];

  // Certificate List Data
  certificates: any[] = [
    {
      id: '1',
      studentId: 'CIPC001',
      studentName: 'Rahul Kumar',
      course: 'Nursing',
      certificateNumber: 'CERT-2024-0315-12345',
      issueDate: '2024-03-15',
      status: 'issued'
    },
    {
      id: '2',
      studentId: 'CIPC002',
      studentName: 'Priya Sharma',
      course: 'Medical Laboratory Technology',
      certificateNumber: 'CERT-2024-0320-12346',
      issueDate: '2024-03-20',
      status: 'pending'
    }
  ];

  get filteredStudents(): Student[] {
    return this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            student.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || student.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    if (this.activeTab === 'students') {
      return Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    }
    return this.totalPagesForCurrentTab;
  }

  get pageNumbers(): number[] {
    if (this.activeTab === 'students') {
      const pages: number[] = [];
      const total = Math.ceil(this.filteredStudents.length / this.itemsPerPage);
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
    return this.pageNumbersForCurrentTab;
  }

  goToPage(page: number) {
    if (this.activeTab === 'students') {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      this.goToPageForCurrentTab(page);
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
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredStudents.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  // Action button methods
  viewStudent(student: Student) {
    console.log('View student:', student);
    // Implement view student functionality
  }

  editStudent(student: Student) {
    console.log('Edit student:', student);
    // Implement edit student functionality
  }

  deleteStudent(studentId: string) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(s => s.id !== studentId);
    }
  }

  generateIdCard(student: Student) {
    console.log('Generate ID card for:', student);
    // Implement ID card generation
  }

  switchTab(tab: 'students' | 'admissions' | 'results' | 'certificates') {
    this.activeTab = tab;
    this.currentPage = 1;
    this.searchTerm = '';
    this.selectedDepartment = '';
  }

  get filteredAdmissions() {
    return this.admissions.filter(admission => {
      const matchesSearch = 
        admission.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        admission.enrolmentNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || admission.course === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get filteredStudentResults() {
    return this.studentResults.filter(result => {
      const matchesSearch = 
        result.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        result.studentId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || result.course === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get filteredCertificates() {
    return this.certificates.filter(cert => {
      const matchesSearch = 
        cert.studentName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cert.studentId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cert.certificateNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || cert.course === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get paginatedAdmissions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAdmissions.slice(startIndex, endIndex);
  }

  get paginatedStudentResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredStudentResults.slice(startIndex, endIndex);
  }

  get paginatedCertificates() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCertificates.slice(startIndex, endIndex);
  }

  get currentData() {
    switch(this.activeTab) {
      case 'admissions': return this.filteredAdmissions;
      case 'results': return this.filteredStudentResults;
      case 'certificates': return this.filteredCertificates;
      default: return this.filteredStudents;
    }
  }

  get totalPagesForCurrentTab(): number {
    return Math.ceil(this.currentData.length / this.itemsPerPage);
  }

  get pageNumbersForCurrentTab(): number[] {
    const pages: number[] = [];
    const total = this.totalPagesForCurrentTab;
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

  goToPageForCurrentTab(page: number) {
    if (page >= 1 && page <= this.totalPagesForCurrentTab) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPageForCurrentTab() {
    if (this.currentPage < this.totalPagesForCurrentTab) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPageForCurrentTab() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getStartIndexForCurrentTab(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndexForCurrentTab(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.currentData.length);
  }

  // Action methods for admissions
  viewAdmission(admission: any) {
    console.log('View admission:', admission);
  }

  approveAdmission(admissionId: string) {
    const admission = this.admissions.find(a => a.id === admissionId);
    if (admission) {
      admission.status = 'approved';
    }
  }

  rejectAdmission(admissionId: string) {
    const admission = this.admissions.find(a => a.id === admissionId);
    if (admission) {
      admission.status = 'rejected';
    }
  }

  // Action methods for results
  viewStudentResult(result: any) {
    console.log('View result:', result);
  }

  downloadResult(result: any) {
    console.log('Download result:', result);
  }

  // Action methods for certificates
  viewCertificate(cert: any) {
    console.log('View certificate:', cert);
  }

  issueCertificate(certId: string) {
    const cert = this.certificates.find(c => c.id === certId);
    if (cert) {
      cert.status = 'issued';
      cert.issueDate = new Date().toISOString().split('T')[0];
    }
  }

  downloadCertificate(cert: any) {
    console.log('Download certificate:', cert);
  }
}
