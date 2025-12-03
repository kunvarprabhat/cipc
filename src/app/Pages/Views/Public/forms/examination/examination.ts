import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-examination-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './examination.html',
  styleUrls: ['./examination.css']
})
export class ExaminationForm implements OnInit {
  examinationForm!: FormGroup;
  verificationForm!: FormGroup;
  isSubmitted = false;
  submitSuccess = false;
  isProcessing = false;
  studentPhotoPreview: string | null = null;
  studentPhotoFile: File | null = null;
  generatedFormNumber: string = '';
  isVerified = false;
  verificationError = '';
  isVerifying = false;
  studentData: any = null;

  // Step-by-step navigation
  currentStep: number = 1;
  totalSteps: number = 4;
  steps = [
    { number: 1, title: 'Personal Information', icon: 'ri-user-line' },
    { number: 2, title: 'Exam Details', icon: 'ri-file-list-line' },
    { number: 3, title: 'Address & Contact', icon: 'ri-map-pin-line' },
    { number: 4, title: 'Review & Submit', icon: 'ri-file-check-line' }
  ];

  // Date picker configuration
  maxDate: Date;
  startDate: Date;
  maxDateDOB: Date; // For DOB verification

  courses = [
    'Medical Laboratory Technology',
    'X-Ray Technology',
    'OT Technology',
    'Cardiac Care Technology',
    'Ophthalmic Technology',
    'Physiotherapy',
    'Dialysis Technology',
    'Radiology Technology',
    'Operation Theatre Technology',
    'Medical Record Technology',
    'Health Inspector',
    'Community Health Worker'
  ];

  examTypes = [
    'Theory',
    'Practical',
    'Theory & Practical',
    'Internal Assessment',
    'Final Examination',
    'Supplementary Examination'
  ];

  examCenters = [
    'Main Campus - Varanasi',
    'Delhi Center',
    'Mumbai Center',
    'Kolkata Center',
    'Chennai Center',
    'Bangalore Center',
    'Hyderabad Center',
    'Pune Center'
  ];

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Puducherry'
  ];

  districtsByState: { [key: string]: string[] } = {
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi']
  };

  filteredCourses!: Observable<string[]>;
  filteredExamTypes!: Observable<string[]>;
  filteredExamCenters!: Observable<string[]>;
  filteredStates!: Observable<string[]>;
  filteredDistricts!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    // Set max date to today
    const today = new Date();
    this.maxDate = today;
    // Set start date to 1 year ago for better UX
    this.startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    // Set max date for DOB (user must be at least 16 years old)
    this.maxDateDOB = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  }

  ngOnInit() {
    this.initializeVerificationForm();
    this.initializeForm();

    // Setup autocomplete filtering for courses
    this.filteredCourses = this.examinationForm.get('course')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCourses(value || ''))
    );

    // Setup autocomplete filtering for exam types
    this.filteredExamTypes = this.examinationForm.get('examType')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterExamTypes(value || ''))
    );

    // Setup autocomplete filtering for exam centers
    this.filteredExamCenters = this.examinationForm.get('examCenter')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterExamCenters(value || ''))
    );

    // Setup autocomplete filtering for states
    this.filteredStates = this.examinationForm.get('state')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStates(value || ''))
    );

    // Setup district filtering based on selected state
    this.examinationForm.get('state')?.valueChanges.subscribe(selectedState => {
      if (selectedState && this.districtsByState[selectedState]) {
        const districts = this.districtsByState[selectedState];
        this.filteredDistricts = this.examinationForm.get('district')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDistricts(value || '', districts))
        );
        this.examinationForm.patchValue({ district: '' });
      } else {
        this.filteredDistricts = new Observable(observer => {
          observer.next([]);
          observer.complete();
        });
      }
    });
  }

  private _filterCourses(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.courses.filter(course => course.toLowerCase().includes(filterValue));
  }

  private _filterExamTypes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.examTypes.filter(type => type.toLowerCase().includes(filterValue));
  }

  private _filterExamCenters(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.examCenters.filter(center => center.toLowerCase().includes(filterValue));
  }

  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));
  }

  private _filterDistricts(value: string, districts: string[]): string[] {
    const filterValue = value.toLowerCase();
    return districts.filter(district => district.toLowerCase().includes(filterValue));
  }

  displayCourse(course: string): string {
    return course || '';
  }

  displayExamType(type: string): string {
    return type || '';
  }

  displayExamCenter(center: string): string {
    return center || '';
  }

  displayState(state: string): string {
    return state || '';
  }

  displayDistrict(district: string): string {
    return district || '';
  }

  initializeVerificationForm() {
    this.verificationForm = this.fb.group({
      enrolmentNumber: ['', [Validators.required, Validators.minLength(5)]],
      dateOfBirthFull: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])$/)]],
      monthOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      yearOfBirth: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]]
    });
  }

  initializeForm() {
    this.examinationForm = this.fb.group({
      formNumber: [{value: '', disabled: true}],
      enrolmentNumber: ['', [Validators.required, Validators.minLength(5)]],
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', Validators.required],
      examType: ['', Validators.required],
      examDate: ['', Validators.required],
      examDateFull: ['', Validators.required],
      subject: ['', Validators.required],
      examCenter: ['', Validators.required],
      fullPostalAddress: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      studentPhoto: ['']
    });
  }

  onVerificationDateSelected(event: any) {
    if (event && event.value) {
      const selectedDate = new Date(event.value);
      if (!isNaN(selectedDate.getTime())) {
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = String(selectedDate.getFullYear());
        
        this.verificationForm.patchValue({
          dateOfBirth: day,
          monthOfBirth: month,
          yearOfBirth: year,
          dateOfBirthFull: selectedDate
        }, { emitEvent: false });
      }
    }
  }

  syncVerificationDateFromManualInputs() {
    const day = String(this.verificationForm.get('dateOfBirth')?.value || '').padStart(2, '0');
    const month = String(this.verificationForm.get('monthOfBirth')?.value || '').padStart(2, '0');
    const year = String(this.verificationForm.get('yearOfBirth')?.value || '');
    
    if (day && month && year && day.length <= 2 && month.length <= 2 && year.length === 4) {
      const dateStr = `${year}-${month}-${day}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime()) && dateObj <= this.maxDateDOB) {
        this.verificationForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
        this.verificationForm.patchValue({
          dateOfBirth: day,
          monthOfBirth: month
        }, { emitEvent: false });
      }
    }
  }

  validateVerificationDateInput(event: any, fieldName: string, min: number, max: number) {
    const value = parseInt(event.target.value);
    if (isNaN(value) || value < min || value > max) {
      if (value > max) {
        event.target.value = max;
        this.verificationForm.patchValue({ [fieldName]: String(max) }, { emitEvent: false });
      } else if (value < min && value > 0) {
        event.target.value = min;
        this.verificationForm.patchValue({ [fieldName]: String(min).padStart(2, '0') }, { emitEvent: false });
      }
    }
    this.syncVerificationDateFromManualInputs();
  }

  verifyStudent() {
    this.isVerifying = true;
    this.verificationError = '';

    // Mark all fields as touched to show validation errors
    Object.keys(this.verificationForm.controls).forEach(key => {
      const control = this.verificationForm.get(key);
      if (control) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });

    // Check if dateOfBirthFull is empty but manual date fields are filled
    if (!this.verificationForm.get('dateOfBirthFull')?.value && 
        this.verificationForm.get('dateOfBirth')?.value && 
        this.verificationForm.get('monthOfBirth')?.value && 
        this.verificationForm.get('yearOfBirth')?.value) {
      const day = this.verificationForm.get('dateOfBirth')?.value;
      const month = this.verificationForm.get('monthOfBirth')?.value;
      const year = this.verificationForm.get('yearOfBirth')?.value;
      const dateStr = `${year}-${month}-${day}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        this.verificationForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
      }
    }

    if (this.verificationForm.valid) {
      const enrolmentNumber = this.verificationForm.get('enrolmentNumber')?.value;
      const dob = this.verificationForm.get('dateOfBirthFull')?.value;
      
      // Dummy/Test verification data for testing
      const dummyStudents = [
        {
          enrolmentNumber: 'CIPC-2025-0101-12345',
          dateOfBirth: new Date('2000-01-15'),
          nameInCapital: 'RAHUL KUMAR',
          courseOptedFor: 'Medical Laboratory Technology',
          fullPostalAddress: '123, Test Street, Varanasi',
          district: 'Varanasi',
          state: 'Uttar Pradesh',
          pinCode: '221001',
          mobileNo1: '9876543210',
          email: 'test@example.com',
          studentPhoto: ''
        },
        {
          enrolmentNumber: 'CIPC-2025-0101-54321',
          dateOfBirth: new Date('1999-05-20'),
          nameInCapital: 'PRIYA SHARMA',
          courseOptedFor: 'X-Ray Technology',
          fullPostalAddress: '456, Sample Road, Lucknow',
          district: 'Lucknow',
          state: 'Uttar Pradesh',
          pinCode: '226001',
          mobileNo1: '9876543211',
          email: 'priya@example.com',
          studentPhoto: ''
        },
        {
          enrolmentNumber: 'TEST123',
          dateOfBirth: new Date('2001-12-25'),
          nameInCapital: 'TEST STUDENT',
          courseOptedFor: 'Physiotherapy',
          fullPostalAddress: '789, Demo Avenue, Delhi',
          district: 'New Delhi',
          state: 'Delhi',
          pinCode: '110001',
          mobileNo1: '9876543212',
          email: 'teststudent@example.com',
          studentPhoto: ''
        }
      ];

      // Check dummy data first
      const dummyMatch = dummyStudents.find(dummy => {
        const dummyDOB = new Date(dummy.dateOfBirth);
        const verifyDOB = new Date(dob);
        return dummy.enrolmentNumber === enrolmentNumber &&
               dummyDOB.getDate() === verifyDOB.getDate() &&
               dummyDOB.getMonth() === verifyDOB.getMonth() &&
               dummyDOB.getFullYear() === verifyDOB.getFullYear();
      });

      if (dummyMatch) {
        // Dummy verification successful - convert to expected format
        const dummyData = {
          ...dummyMatch,
          dateOfBirthFull: dummyMatch.dateOfBirth,
          enrolmentNumber: dummyMatch.enrolmentNumber
        };
        this.studentData = dummyData;
        this.isVerified = true;
        this.autoFillForm(dummyData);
        this.isVerifying = false;
        return;
      }
      
      // Get stored registration data from localStorage
      const storedData = localStorage.getItem('admissionFormData');
      
      if (storedData) {
        try {
          const registrationData = JSON.parse(storedData);
          
          // Check if enrolment number matches
          if (registrationData.enrolmentNumber === enrolmentNumber) {
            // Check if DOB matches
            const regDOB = new Date(registrationData.dateOfBirthFull);
            const verifyDOB = new Date(dob);
            
            // Compare dates (ignore time)
            if (regDOB.getDate() === verifyDOB.getDate() &&
                regDOB.getMonth() === verifyDOB.getMonth() &&
                regDOB.getFullYear() === verifyDOB.getFullYear()) {
              
              // Verification successful - store student data and auto-fill form
              this.studentData = registrationData;
              this.isVerified = true;
              this.autoFillForm(registrationData);
              this.isVerifying = false;
              return;
            }
          }
        } catch (e) {
          console.error('Error parsing stored data:', e);
        }
      }
      
      // If no match found
      this.verificationError = 'Enrolment Number or Date of Birth does not match. Please check and try again.';
      this.isVerifying = false;
    } else {
      this.verificationError = 'Please fill all fields correctly.';
      this.isVerifying = false;
    }
  }

  autoFillForm(registrationData: any) {
    // Auto-fill common fields from registration data
    this.examinationForm.patchValue({
      enrolmentNumber: registrationData.enrolmentNumber || '',
      studentName: registrationData.nameInCapital || '',
      course: registrationData.courseOptedFor || '',
      fullPostalAddress: registrationData.fullPostalAddress || '',
      district: registrationData.district || '',
      state: registrationData.state || '',
      pinCode: registrationData.pinCode || '',
      mobileNo: registrationData.mobileNo1 || '',
      email: registrationData.email || '',
      studentPhoto: registrationData.studentPhoto || ''
    });

    // Set photo preview if available
    if (registrationData.studentPhoto) {
      this.studentPhotoPreview = registrationData.studentPhoto;
    }
  }

  onDateSelected(event: any) {
    const selectedDate = event.value ? new Date(event.value) : null;
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = String(selectedDate.getFullYear());
      
      this.examinationForm.patchValue({
        examDate: `${day}/${month}/${year}`
      });
    }
  }

  generateFormNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    
    return `EXAM-${year}-${month}${day}-${randomNum}`;
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        alert('Please select a valid image file (JPEG, JPG, PNG, GIF)');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      this.studentPhotoFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.studentPhotoPreview = e.target.result;
        this.examinationForm.patchValue({ studentPhoto: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.studentPhotoPreview = null;
    this.studentPhotoFile = null;
    this.examinationForm.patchValue({ studentPhoto: '' });
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.examinationForm.controls;
  }

  hasError(fieldName: string): boolean {
    const field = this.examinationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.examinationForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'pinCode') {
          return 'Pin code must be 6 digits';
        }
        if (fieldName === 'mobileNo') {
          return 'Invalid mobile number';
        }
      }
      if (field.errors['email']) {
        return 'Invalid email address';
      }
    }
    return '';
  }

  onSubmit() {
    this.isSubmitted = true;
    
    // If not on last step, go to next step
    if (this.currentStep < this.totalSteps) {
      if (this.isStepValid(this.currentStep)) {
        this.nextStep();
      }
      return;
    }
    
    // On last step, validate and submit
    if (this.examinationForm.valid) {
      this.isProcessing = true;
      
      this.generatedFormNumber = this.generateFormNumber();
      this.examinationForm.patchValue({ formNumber: this.generatedFormNumber });
      
      const formData = {
        ...this.examinationForm.getRawValue(),
        formNumber: this.generatedFormNumber
      };
      
      console.log('Form Data:', formData);
      
      setTimeout(() => {
        this.printForm();
        
        setTimeout(() => {
          this.downloadForm();
        }, 500);
        
        setTimeout(() => {
          this.emailForm(formData);
        }, 1000);
        
        this.submitSuccess = true;
        this.isProcessing = false;
        
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 500);
    } else {
      const firstError = Object.keys(this.f).find(key => this.f[key].invalid);
      if (firstError) {
        const element = document.querySelector(`[formControlName="${firstError}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }

  printForm() {
    window.print();
  }

  downloadForm() {
    window.print();
  }

  emailForm(formData: any) {
    const subject = `Examination Form - ${formData.studentName || 'CIPC Student'}`;
    const body = this.formatFormDataForEmail(formData);
    const email = 'cipcvns@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  formatFormDataForEmail(formData: any): string {
    return `
EXAMINATION FORM SUBMISSION
===========================

FORM NUMBER: ${formData.formNumber || 'N/A'} (For office use only)

Enrolment Number: ${formData.enrolmentNumber || ''}
Student Name: ${formData.studentName || ''}
Course: ${formData.course || ''}
Exam Type: ${formData.examType || ''}
Exam Date: ${formData.examDate || ''}
Subject: ${formData.subject || ''}
Exam Center: ${formData.examCenter || ''}

Full Postal Address: ${formData.fullPostalAddress || ''}
District: ${formData.district || ''}
State: ${formData.state || ''}
Pin Code: ${formData.pinCode || ''}

Mobile No.: ${formData.mobileNo || ''}
Email: ${formData.email || ''}

---
Submitted on: ${new Date().toLocaleString()}
    `.trim();
  }

  resetForm() {
    this.isSubmitted = false;
    this.submitSuccess = false;
    this.isProcessing = false;
    this.studentPhotoPreview = null;
    this.studentPhotoFile = null;
    this.generatedFormNumber = '';
    this.currentStep = 1;
    this.examinationForm.reset();
    this.initializeForm();
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Step navigation methods
  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      this.isSubmitted = true;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(
          this.examinationForm.get('enrolmentNumber')?.valid &&
          this.examinationForm.get('studentName')?.valid
        );
      case 2:
        return !!(
          this.examinationForm.get('course')?.valid &&
          this.examinationForm.get('examType')?.valid &&
          this.examinationForm.get('examDate')?.valid &&
          this.examinationForm.get('subject')?.valid &&
          this.examinationForm.get('examCenter')?.valid
        );
      case 3:
        return !!(
          this.examinationForm.get('fullPostalAddress')?.valid &&
          this.examinationForm.get('state')?.valid &&
          this.examinationForm.get('district')?.valid &&
          this.examinationForm.get('pinCode')?.valid &&
          this.examinationForm.get('mobileNo')?.valid
        );
      case 4:
        return this.examinationForm.valid;
      default:
        return false;
    }
  }
}

