import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Subscription } from 'rxjs';

/**
 * Interface for subject marks in a semester
 */
interface SubjectMarks {
  subjectName: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
}

/**
 * Interface for semester result data
 */
interface SemesterResult {
  semester: string;
  semesterNumber: number;
  subjects: SubjectMarks[];
  totalMarks: number;
  totalObtained: number;
  percentage: number;
  overallGrade: string;
  resultStatus: string;
}

/**
 * Interface for session result data
 */
interface SessionResult {
  session: string;
  semesters: SemesterResult[];
}

/**
 * Interface for complete result data
 */
interface ResultData {
  enrolmentNumber: string;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  photo: string;
  course: string;
  sessions: SessionResult[];
}

/**
 * Interface for registration data from localStorage
 */
interface RegistrationData {
  enrolmentNumber: string;
  nameInCapital?: string;
  fathersName?: string;
  dateOfBirthFull: string;
  studentPhoto?: string;
  courseOptedFor?: string;
}


/**
 * Results Component - Handles student result checking and display
 */
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  templateUrl: './results.html',
  styleUrls: ['./results.css']
})
export class Results implements OnInit, OnDestroy {
  // Form and state properties
  resultsForm!: FormGroup;
  isChecking = false;
  checkError: string | null = null;
  resultData: ResultData | null = null;
  selectedSession = '';
  selectedSemester = '';
  currentSemesterResult: SemesterResult | null = null;

  // Date constraints
  maxDate: Date;
  startDate: Date;
  maxYear: number;

  // Subscription management
  private readonly subscriptions = new Subscription();

  // Constants
  private static readonly MIN_AGE = 15;
  private static readonly MIN_YEAR = 1950;
  private static readonly STORAGE_KEY = 'admissionFormData';
  private static readonly DEFAULT_SESSION = '2024-2025';
  private static readonly PDF_LOAD_DELAY = 250;

  // Dummy data for testing
  private readonly DUMMY_DOB_MAP: Readonly<Record<string, Date>> = {
    'CIPC-2025-0101-12345': new Date('2000-01-15'),
    'CIPC-2025-0101-54321': new Date('1999-05-20'),
    'TEST123': new Date('2001-12-25')
  } as const;

  constructor(private readonly fb: FormBuilder) {
    const today = new Date();
    this.maxDate = new Date(
      today.getFullYear() - Results.MIN_AGE, 
      today.getMonth(), 
      today.getDate()
    );
    this.startDate = new Date(Results.MIN_YEAR, 0, 1);
    this.maxYear = today.getFullYear() - Results.MIN_AGE;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Initialize the reactive form with validators and subscriptions
   */
  private initializeForm(): void {
    this.resultsForm = this.fb.group({
      enrolmentNumber: ['', [Validators.required, Validators.minLength(5)]],
      dateOfBirthFull: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])$/)]],
      monthOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      yearOfBirth: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]]
    });

    this.setupFormSubscriptions();
  }

  /**
   * Setup form value change subscriptions for date synchronization
   */
  private setupFormSubscriptions(): void {
    // Sync datepicker with manual inputs
    const dobFullControl = this.resultsForm.get('dateOfBirthFull');
    if (dobFullControl) {
      const sub = dobFullControl.valueChanges.subscribe((date: Date | null) => {
        if (date) {
          this.updateManualDateFields(new Date(date));
        }
      });
      this.subscriptions.add(sub);
    }

    // Sync manual inputs with datepicker
    const manualDateControls = ['dateOfBirth', 'monthOfBirth', 'yearOfBirth'];
    manualDateControls.forEach(controlName => {
      const control = this.resultsForm.get(controlName);
      if (control) {
        const sub = control.valueChanges.subscribe(() => this.syncDateFromManualInputs());
        this.subscriptions.add(sub);
      }
    });
  }

  /**
   * Update manual date input fields from datepicker selection
   */
  private updateManualDateFields(date: Date): void {
    this.resultsForm.patchValue({
      dateOfBirth: String(date.getDate()).padStart(2, '0'),
      monthOfBirth: String(date.getMonth() + 1).padStart(2, '0'),
      yearOfBirth: String(date.getFullYear())
    }, { emitEvent: false });
  }

  /**
   * Format date to DD/MM/YYYY format
   */
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Compare two dates (ignoring time)
   */
  private compareDates(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  /**
   * Set default session and semester from result data
   */
  private setDefaultSessionAndSemester(): void {
    if (!this.resultData?.sessions?.length) return;

    this.selectedSession = this.resultData.sessions[0].session;
    const firstSemester = this.resultData.sessions[0].semesters?.[0];
    
    if (firstSemester) {
      this.selectedSemester = firstSemester.semester;
      this.currentSemesterResult = firstSemester;
    }
  }

  /**
   * Sync datepicker from manual date inputs
   */
  private syncDateFromManualInputs(): void {
    const day = String(this.resultsForm.get('dateOfBirth')?.value || '').padStart(2, '0');
    const month = String(this.resultsForm.get('monthOfBirth')?.value || '').padStart(2, '0');
    const year = String(this.resultsForm.get('yearOfBirth')?.value || '');
    
    if (day && month && year && day.length <= 2 && month.length <= 2 && year.length === 4) {
      const dateObj = new Date(`${year}-${month}-${day}`);
      if (!isNaN(dateObj.getTime()) && dateObj <= this.maxDate) {
        this.resultsForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
      }
    }
  }

  /**
   * Validate and constrain date input values
   */
  validateDateInput(event: Event, fieldName: string, min: number, max: number): void {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    
    if (isNaN(value) || value < min || value > max) {
      if (value > max) {
        input.value = String(max);
        this.resultsForm.patchValue({ [fieldName]: String(max) }, { emitEvent: false });
      } else if (value < min && value > 0) {
        input.value = String(min).padStart(2, '0');
        this.resultsForm.patchValue({ [fieldName]: String(min).padStart(2, '0') }, { emitEvent: false });
      }
    }
    this.syncDateFromManualInputs();
  }

  /**
   * Handle datepicker date selection
   */
  onDateSelected(event: { value: Date | null }): void {
    if (event?.value) {
      const selectedDate = new Date(event.value);
      if (!isNaN(selectedDate.getTime())) {
        this.updateManualDateFields(selectedDate);
        this.resultsForm.patchValue({ dateOfBirthFull: selectedDate }, { emitEvent: false });
      }
    }
  }

  /**
   * Check and validate student results
   */
  checkResults(): void {
    this.resetCheckState();
    this.markAllFieldsTouched();
    this.syncDateFromManualIfNeeded();

    if (!this.resultsForm.valid) {
      this.checkError = 'Please fill all fields correctly.';
      this.isChecking = false;
      return;
    }

    const enrolmentNumber = this.resultsForm.get('enrolmentNumber')?.value?.trim();
    const dob = this.resultsForm.get('dateOfBirthFull')?.value;

    if (!enrolmentNumber || !dob) {
      this.checkError = 'Please fill all fields correctly.';
      this.isChecking = false;
      return;
    }

    // Check dummy data first, then localStorage
    const result = this.checkDummyData(enrolmentNumber, dob) || 
                   this.checkLocalStorageData(enrolmentNumber, dob);

    if (result) {
      this.resultData = result;
      this.setDefaultSessionAndSemester();
      this.scrollToTop();
    } else {
      this.checkError = 'Enrolment Number or Date of Birth does not match. Please check and try again.';
    }

    this.isChecking = false;
  }

  /**
   * Reset check state before new verification
   */
  private resetCheckState(): void {
    this.isChecking = true;
    this.checkError = null;
    this.resultData = null;
  }

  /**
   * Mark all form fields as touched for validation display
   */
  private markAllFieldsTouched(): void {
    Object.keys(this.resultsForm.controls).forEach(key => {
      const control = this.resultsForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
  }

  /**
   * Sync datepicker from manual inputs if needed
   */
  private syncDateFromManualIfNeeded(): void {
    const dobFull = this.resultsForm.get('dateOfBirthFull')?.value;
    const day = this.resultsForm.get('dateOfBirth')?.value;
    const month = this.resultsForm.get('monthOfBirth')?.value;
    const year = this.resultsForm.get('yearOfBirth')?.value;

    if (!dobFull && day && month && year) {
      const dateObj = new Date(`${year}-${month}-${day}`);
      if (!isNaN(dateObj.getTime())) {
        this.resultsForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
      }
    }
  }

  /**
   * Scroll to top of page smoothly
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private readonly DUMMY_RESULTS: { [key: string]: ResultData } = {
    'CIPC-2025-0101-12345': {
          enrolmentNumber: 'CIPC-2025-0101-12345',
          studentName: 'RAHUL KUMAR',
          fatherName: 'RAJESH KUMAR',
          dateOfBirth: '15/01/2000',
          photo: '',
          course: 'DIPLOMA IN MEDICAL LABORATORY TECHNOLOGY',
          sessions: [
            {
              session: '2024-2025',
              semesters: [
                {
                  semester: '1st Year',
                  semesterNumber: 1,
                  subjects: [
                    { subjectName: 'Anatomy & Physiology', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Laboratory Management', marksObtained: 82, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Haematology', marksObtained: 88, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Biochemistry', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Practical', marksObtained: 175, totalMarks: 200, grade: 'A+' }
                  ],
                  totalMarks: 600,
                  totalObtained: 515,
                  percentage: 85.83,
                  overallGrade: 'A+',
                  resultStatus: 'PASS'
                },
                {
                  semester: '2nd Year',
                  semesterNumber: 2,
                  subjects: [
                    { subjectName: 'Clinical Pathology', marksObtained: 88, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Blood Banking & Serology', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Microbiology & Parasitology', marksObtained: 90, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Histopathology & Cytology', marksObtained: 87, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Practical', marksObtained: 180, totalMarks: 200, grade: 'A+' }
                  ],
                  totalMarks: 600,
                  totalObtained: 530,
                  percentage: 88.33,
                  overallGrade: 'A+',
                  resultStatus: 'PASS'
                }
              ]
            }
          ]
        },
        'CIPC-2025-0101-54321': {
          enrolmentNumber: 'CIPC-2025-0101-54321',
          studentName: 'PRIYA SHARMA',
          fatherName: 'SURESH SHARMA',
          dateOfBirth: '20/05/1999',
          photo: '',
          course: 'X-Ray Technology',
          sessions: [
            {
              session: '2024-2025',
              semesters: [
                {
                  semester: '1st Semester',
                  semesterNumber: 1,
                  subjects: [
                    { subjectName: 'Anatomy & Physiology', marksObtained: 90, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Radiation Physics', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Radiographic Techniques', marksObtained: 88, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Patient Care', marksObtained: 82, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Medical Ethics', marksObtained: 80, totalMarks: 100, grade: 'A' }
                  ],
                  totalMarks: 500,
                  totalObtained: 425,
                  percentage: 85,
                  overallGrade: 'A+',
                  resultStatus: 'PASS'
                },
                {
                  semester: '2nd Semester',
                  semesterNumber: 2,
                  subjects: [
                    { subjectName: 'Advanced Radiography', marksObtained: 87, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'CT & MRI', marksObtained: 90, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Ultrasound', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Radiation Safety', marksObtained: 88, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Quality Assurance', marksObtained: 83, totalMarks: 100, grade: 'A+' }
                  ],
                  totalMarks: 500,
                  totalObtained: 433,
                  percentage: 86.6,
                  overallGrade: 'A+',
                  resultStatus: 'PASS'
                },
                {
                  semester: '3rd Semester',
                  semesterNumber: 3,
                  subjects: [
                    { subjectName: 'Radiographic Techniques', marksObtained: 88, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Radiation Physics', marksObtained: 82, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Anatomy & Physiology', marksObtained: 90, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Patient Care', marksObtained: 85, totalMarks: 100, grade: 'A+' },
                    { subjectName: 'Medical Ethics', marksObtained: 80, totalMarks: 100, grade: 'A' }
                  ],
                  totalMarks: 500,
                  totalObtained: 425,
                  percentage: 85,
                  overallGrade: 'A+',
                  resultStatus: 'PASS'
                }
              ]
            }
          ]
        },
        'TEST123': {
          enrolmentNumber: 'TEST123',
          studentName: 'TEST STUDENT',
          fatherName: 'TEST FATHER',
          dateOfBirth: '25/12/2001',
          photo: '',
          course: 'Physiotherapy',
          sessions: [
            {
              session: '2024-2025',
              semesters: [
                {
                  semester: '1st Semester',
                  semesterNumber: 1,
                  subjects: [
                    { subjectName: 'Anatomy', marksObtained: 80, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Physiology', marksObtained: 75, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Biomechanics', marksObtained: 78, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Exercise Therapy', marksObtained: 72, totalMarks: 100, grade: 'B+' },
                    { subjectName: 'Pathology', marksObtained: 70, totalMarks: 100, grade: 'B+' }
                  ],
                  totalMarks: 500,
                  totalObtained: 375,
                  percentage: 75,
                  overallGrade: 'A',
                  resultStatus: 'PASS'
                },
                {
                  semester: '2nd Semester',
                  semesterNumber: 2,
                  subjects: [
                    { subjectName: 'Electrotherapy', marksObtained: 76, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Manual Therapy', marksObtained: 80, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Orthopedics', marksObtained: 74, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Neurology', marksObtained: 72, totalMarks: 100, grade: 'B+' },
                    { subjectName: 'Cardiopulmonary', marksObtained: 78, totalMarks: 100, grade: 'A' }
                  ],
                  totalMarks: 500,
                  totalObtained: 380,
                  percentage: 76,
                  overallGrade: 'A',
                  resultStatus: 'PASS'
                },
                {
                  semester: '3rd Semester',
                  semesterNumber: 3,
                  subjects: [
                    { subjectName: 'Exercise Therapy', marksObtained: 75, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Electrotherapy', marksObtained: 70, totalMarks: 100, grade: 'B+' },
                    { subjectName: 'Anatomy', marksObtained: 80, totalMarks: 100, grade: 'A' },
                    { subjectName: 'Physiology', marksObtained: 72, totalMarks: 100, grade: 'B+' },
                    { subjectName: 'Pathology', marksObtained: 78, totalMarks: 100, grade: 'A' }
                  ],
                  totalMarks: 500,
                  totalObtained: 375,
                  percentage: 75,
                  overallGrade: 'A',
                  resultStatus: 'PASS'
                }
              ]
            }
          ]
    }
  };

  /**
   * Check dummy data for testing purposes
   */
  private checkDummyData(enrolmentNumber: string, dob: Date): ResultData | null {
    const expectedDOB = this.DUMMY_DOB_MAP[enrolmentNumber];
    if (!expectedDOB) return null;

    const verifyDOB = new Date(dob);
    if (!this.compareDates(expectedDOB, verifyDOB)) return null;

    const result = this.DUMMY_RESULTS[enrolmentNumber];
    if (!result) return null;

    return {
      ...result,
      dateOfBirth: this.formatDate(new Date(dob))
    };
  }

  /**
   * Check localStorage for registered student data
   */
  private checkLocalStorageData(enrolmentNumber: string, dob: Date): ResultData | null {
    try {
      const storedData = localStorage.getItem(Results.STORAGE_KEY);
      if (!storedData) return null;

      const registrationData: RegistrationData = JSON.parse(storedData);
      if (registrationData.enrolmentNumber !== enrolmentNumber) return null;

      const regDOB = new Date(registrationData.dateOfBirthFull);
      if (!this.compareDates(regDOB, new Date(dob))) return null;

      return this.generateResultFromRegistration(registrationData);
    } catch (error) {
      console.error('Error parsing stored data:', error);
      return null;
    }
  }

  /**
   * Generate result data from registration data
   */
  private generateResultFromRegistration(registrationData: RegistrationData): ResultData {
    const formattedDOB = this.formatDate(new Date(registrationData.dateOfBirthFull));
    const defaultSemesters: SemesterResult[] = [
      {
        semester: '1st Semester',
        semesterNumber: 1,
        subjects: [
          { subjectName: 'Subject 1', marksObtained: 75, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 2', marksObtained: 80, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 3', marksObtained: 70, totalMarks: 100, grade: 'B+' },
          { subjectName: 'Subject 4', marksObtained: 78, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 5', marksObtained: 82, totalMarks: 100, grade: 'A+' }
        ],
        totalMarks: 500,
        totalObtained: 385,
        percentage: 77,
        overallGrade: 'A',
        resultStatus: 'PASS'
      },
      {
        semester: '2nd Semester',
        semesterNumber: 2,
        subjects: [
          { subjectName: 'Subject 1', marksObtained: 78, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 2', marksObtained: 82, totalMarks: 100, grade: 'A+' },
          { subjectName: 'Subject 3', marksObtained: 75, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 4', marksObtained: 80, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 5', marksObtained: 85, totalMarks: 100, grade: 'A+' }
        ],
        totalMarks: 500,
        totalObtained: 400,
        percentage: 80,
        overallGrade: 'A',
        resultStatus: 'PASS'
      },
      {
        semester: '3rd Semester',
        semesterNumber: 3,
        subjects: [
          { subjectName: 'Subject 1', marksObtained: 75, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 2', marksObtained: 80, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 3', marksObtained: 70, totalMarks: 100, grade: 'B+' },
          { subjectName: 'Subject 4', marksObtained: 78, totalMarks: 100, grade: 'A' },
          { subjectName: 'Subject 5', marksObtained: 82, totalMarks: 100, grade: 'A+' }
        ],
        totalMarks: 500,
        totalObtained: 385,
        percentage: 77,
        overallGrade: 'A',
        resultStatus: 'PASS'
      }
    ];

    return {
      enrolmentNumber: registrationData.enrolmentNumber,
      studentName: registrationData.nameInCapital || 'Student',
      fatherName: registrationData.fathersName || 'Father Name',
      dateOfBirth: formattedDOB,
      photo: registrationData.studentPhoto || '',
      course: registrationData.courseOptedFor || 'Course',
      sessions: [{
        session: Results.DEFAULT_SESSION,
        semesters: defaultSemesters
      }]
    };
  }

  /**
   * Reset form and clear all result data
   */
  resetForm(): void {
    this.resultsForm.reset();
    this.resultData = null;
    this.checkError = null;
    this.selectedSession = '';
    this.selectedSemester = '';
    this.currentSemesterResult = null;
  }

  /**
   * Handle session selection change
   */
  onSessionChange(): void {
    if (!this.resultData || !this.selectedSession) return;
    
    const session = this.resultData.sessions.find(s => s.session === this.selectedSession);
    const firstSemester = session?.semesters?.[0];
    
    if (firstSemester) {
      this.selectedSemester = firstSemester.semester;
      this.currentSemesterResult = firstSemester;
    }
  }

  /**
   * Handle semester selection change
   */
  onSemesterChange(): void {
    if (!this.resultData || !this.selectedSession || !this.selectedSemester) return;
    
    const session = this.resultData.sessions.find(s => s.session === this.selectedSession);
    const semester = session?.semesters.find(sem => sem.semester === this.selectedSemester);
    
    if (semester) {
      this.currentSemesterResult = semester;
    }
  }

  /**
   * Get available sessions from result data
   */
  getAvailableSessions(): string[] {
    return this.resultData?.sessions?.map(s => s.session) || [];
  }

  /**
   * Get available semesters for selected session
   */
  getAvailableSemesters(): string[] {
    if (!this.resultData || !this.selectedSession) return [];
    
    const session = this.resultData.sessions.find(s => s.session === this.selectedSession);
    return session?.semesters?.map(sem => sem.semester) || [];
  }

  /**
   * Download result as PDF
   */
  downloadPDF(): void {
    if (!this.resultData || !this.currentSemesterResult) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }

    printWindow.document.write(this.generatePDFHTML());
    printWindow.document.close();
    
    setTimeout(() => printWindow.print(), Results.PDF_LOAD_DELAY);
  }

  /**
   * Generate HTML content for PDF download
   */
  generatePDFHTML(): string {
    if (!this.resultData || !this.currentSemesterResult) return '';

    const student = this.resultData;
    const semester = this.currentSemesterResult;

    return `
<!DOCTYPE html>
<html>
<head>
  <title>Grade Card - ${student.enrolmentNumber}</title>
  <style>
    @page { margin: 0.5cm; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Arial', sans-serif; 
      background: linear-gradient(to bottom, #e0f2fe 0%, #f0f9ff 100%);
      padding: 15px;
      font-size: 12px;
    }
    .document-container {
      background: white;
      padding: 20px;
      min-height: 29.7cm;
      position: relative;
    }
    .top-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
      font-size: 9px;
    }
    .reg-number {
      color: #000;
      font-weight: bold;
    }
    .iso-cert {
      color: #1e40af;
      font-weight: bold;
    }
    .main-header {
      text-align: center;
      margin: 15px 0;
      position: relative;
    }
    .council-name {
      color: #dc2626;
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 2px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .logo-section {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 15px 0;
    }
    .logo-circle {
      width: 80px;
      height: 80px;
      border: 4px solid #fbbf24;
      border-radius: 50%;
      background: #1e40af;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      position: relative;
    }
    .logo-circle::before {
      content: 'PARAMEDICAL';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 8px;
      color: #fbbf24;
      white-space: nowrap;
    }
    .logo-circle::after {
      content: 'COUNCIL';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 8px;
      color: #fbbf24;
      white-space: nowrap;
    }
    .blue-bar {
      background: linear-gradient(to right, #1e40af 0%, #3b82f6 50%, #1e40af 100%);
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0;
      position: relative;
      overflow: hidden;
    }
    .blue-bar::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: repeating-linear-gradient(90deg, white 0px, white 10px, transparent 10px, transparent 20px);
      top: 0;
    }
    .blue-bar::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: repeating-linear-gradient(90deg, white 0px, white 10px, transparent 10px, transparent 20px);
      bottom: 0;
    }
    .blue-bar-text {
      color: white;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 1;
    }
    .registered-office {
      text-align: center;
      font-size: 11px;
      color: #1e3a8a;
      margin: 10px 0;
      font-weight: 600;
    }
    .student-details-section {
      display: grid;
      grid-template-columns: 1fr 1fr 120px;
      gap: 20px;
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
    }
    .student-details-left, .student-details-right {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .detail-item {
      display: flex;
      gap: 5px;
      font-size: 11px;
    }
    .detail-label {
      font-weight: bold;
      color: #1e3a8a;
      min-width: 100px;
    }
    .detail-value {
      color: #000;
      font-weight: 600;
    }
    .photo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .photo-box {
      width: 110px;
      height: 140px;
      border: 3px solid #1e40af;
      background: #e0f2fe;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      overflow: hidden;
    }
    .photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .photo-label {
      font-size: 9px;
      color: #1e3a8a;
      font-weight: bold;
    }
    .marks-sheet-header {
      text-align: center;
      margin: 25px 0 15px 0;
      position: relative;
    }
    .marks-sheet-title {
      color: #dc2626;
      font-size: 20px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 3px;
      display: inline-block;
      position: relative;
      padding: 0 30px;
    }
    .marks-sheet-title::before,
    .marks-sheet-title::after {
      content: '★';
      color: #dc2626;
      font-size: 18px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .marks-sheet-title::before {
      left: 0;
    }
    .marks-sheet-title::after {
      right: 0;
    }
    .marks-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      border: 2px solid #1e40af;
    }
    .marks-table th {
      background: #1e40af;
      color: white;
      padding: 10px 8px;
      text-align: center;
      font-size: 11px;
      font-weight: bold;
      border: 1px solid #1e3a8a;
    }
    .marks-table td {
      padding: 8px;
      border: 1px solid #cbd5e1;
      text-align: center;
      font-size: 11px;
    }
    .marks-table tr:nth-child(even) {
      background: #f1f5f9;
    }
    .marks-table tr:hover {
      background: #e0f2fe;
    }
    .subject-name {
      text-align: left;
      font-weight: 600;
      color: #1e3a8a;
    }
    .total-row {
      background: #dbeafe !important;
      font-weight: bold;
      font-size: 12px;
    }
    .total-row td {
      border-top: 2px solid #1e40af;
      border-bottom: 2px solid #1e40af;
    }
    .summary-section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    .summary-box {
      padding: 12px;
      border-radius: 5px;
      text-align: center;
      border: 2px solid;
    }
    .summary-percentage {
      background: #dbeafe;
      border-color: #3b82f6;
    }
    .summary-grade {
      background: #f3e8ff;
      border-color: #8b5cf6;
    }
    .summary-status {
      background: #d1fae5;
      border-color: #10b981;
    }
    .summary-label {
      font-size: 10px;
      color: #475569;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .summary-value {
      font-size: 22px;
      font-weight: 900;
    }
    .summary-percentage .summary-value { color: #1e3a8a; }
    .summary-grade .summary-value { color: #6b21a8; }
    .summary-status .summary-value { color: #047857; }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid #cbd5e1;
      color: #64748b;
      font-size: 10px;
    }
    @media print {
      body { 
        background: white;
        padding: 0;
      }
      .document-container {
        padding: 15px;
      }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="document-container">
    <!-- Top Header -->
    <div class="top-header">
      <div class="reg-number">Registration No.CIN:U80900UP2022NPL171424</div>
      <div class="iso-cert">AN ISO 9001: 2015 Certified</div>
    </div>

    <!-- Main Header -->
    <div class="main-header">
      <div class="council-name">CIPC PARAMEDICAL COUNCIL</div>
      <div class="logo-section">
        <div class="logo-circle">CIPC</div>
      </div>
    </div>

    <!-- Registered Office -->
    <div class="blue-bar">
      <div class="blue-bar-text"></div>
    </div>
    <div class="registered-office">
      Regd. Office : N-9/38F-31 NEWADA, SUNDERPUR, VARANASI - 221 005
    </div>
    <div class="blue-bar">
      <div class="blue-bar-text"></div>
    </div>

    <!-- Diploma Title -->
    <div class="blue-bar">
      <div class="blue-bar-text">${student.course}</div>
    </div>

    <!-- Student Details -->
    <div class="student-details-section">
      <div class="student-details-left">
        <div class="detail-item">
          <span class="detail-label">Enrollment No. :</span>
          <span class="detail-value">${student.enrolmentNumber}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Name :</span>
          <span class="detail-value">${student.studentName}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Fathers Name :</span>
          <span class="detail-value">${student.fatherName}</span>
        </div>
      </div>
      <div class="student-details-right">
        <div class="detail-item">
          <span class="detail-label">Roll No. :</span>
          <span class="detail-value">${student.enrolmentNumber.split('-').pop() || 'N/A'}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Session :</span>
          <span class="detail-value">${this.selectedSession}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Date of Birth :</span>
          <span class="detail-value">${student.dateOfBirth}</span>
        </div>
      </div>
      <div class="photo-container">
        <div class="photo-box">
          ${student.photo ? `<img src="${student.photo}" alt="Student Photo">` : '<div style="font-size: 36px; color: #1e40af;">👤</div>'}
        </div>
        <div class="photo-label">PHOTO</div>
      </div>
    </div>

    <!-- Marks Sheet Header -->
    <div class="marks-sheet-header">
      <div class="marks-sheet-title">MARKS SHEET</div>
    </div>

    <!-- Marks Table -->
    <table class="marks-table">
      <thead>
        <tr>
          <th style="width: 40%;">Subject</th>
          <th style="width: 20%;">Maximum Marks</th>
          <th style="width: 20%;">Marks Obtain</th>
          <th style="width: 20%;">Grade</th>
        </tr>
      </thead>
      <tbody>
        ${semester.subjects.map(subject => `
          <tr>
            <td class="subject-name">${subject.subjectName}</td>
            <td>${subject.totalMarks}</td>
            <td><strong>${subject.marksObtained}</strong></td>
            <td><strong>${subject.grade}</strong></td>
          </tr>
        `).join('')}
        <tr class="total-row">
          <td class="subject-name"><strong>Total</strong></td>
          <td><strong>${semester.totalMarks}</strong></td>
          <td><strong>${semester.totalObtained}</strong></td>
          <td><strong>${semester.percentage.toFixed(2)}%</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Summary Section -->
    <div class="summary-section">
      <div class="summary-box summary-percentage">
        <div class="summary-label">Percentage</div>
        <div class="summary-value">${semester.percentage.toFixed(2)}%</div>
      </div>
      <div class="summary-box summary-grade">
        <div class="summary-label">Overall Grade</div>
        <div class="summary-value">${semester.overallGrade}</div>
      </div>
      <div class="summary-box summary-status">
        <div class="summary-label">Result Status</div>
        <div class="summary-value">${semester.resultStatus}</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p><strong>This is a computer-generated document. No signature required.</strong></p>
      <p>Generated on: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Check if form field has validation error
   */
  hasError(fieldName: string): boolean {
    const field = this.resultsForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get error message for form field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.resultsForm.get(fieldName);
    if (!field?.errors) return '';

    if (field.errors['required']) {
      return 'This field is required';
    }
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    }
    if (field.errors['pattern']) {
      return 'Invalid format';
    }

    return '';
  }
}

