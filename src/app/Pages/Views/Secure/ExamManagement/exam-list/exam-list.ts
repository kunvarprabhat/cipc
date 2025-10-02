import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Exam {
  id: string;
  examName: string;
  course: string;
  type: 'internal' | 'mid-term' | 'final' | 'practical';
  date: string;
  time: string;
  duration: number;
  totalMarks: number;
  status: 'scheduled' | 'ongoing' | 'completed';
}
@Component({
  selector: 'app-exam-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './exam-list.html',
  styleUrl: './exam-list.css'
})
export class ExamList {
exams: Exam[] = [
    {
      id: '1',
      examName: 'Mid-Term Examination',
      course: 'NUR101 - Fundamentals of Nursing',
      type: 'mid-term',
      date: '2024-03-15',
      time: '10:00',
      duration: 180,
      totalMarks: 100,
      status: 'scheduled'
    },
    {
      id: '2',
      examName: 'Practical Assessment',
      course: 'MLT201 - Clinical Biochemistry',
      type: 'practical',
      date: '2024-03-18',
      time: '14:00',
      duration: 120,
      totalMarks: 50,
      status: 'scheduled'
    }
  ];

  showAddForm = false;
  searchTerm = '';
  selectedType = '';

  examTypes = ['internal', 'mid-term', 'final', 'practical'];
  courses = [
    'NUR101 - Fundamentals of Nursing',
    'MLT201 - Clinical Biochemistry',
    'PHY101 - Basic Physiotherapy'
  ];

  get filteredExams(): Exam[] {
    return this.exams.filter(exam => {
      const matchesSearch = exam.examName.toLowerCase().includes(this.searchTerm.toLowerCase())
        || exam.course.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = !this.selectedType || exam.type === this.selectedType;
      return matchesSearch && matchesType;
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
