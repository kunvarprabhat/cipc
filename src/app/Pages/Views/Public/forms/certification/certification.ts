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
  selector: 'app-certification-form',
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
  templateUrl: './certification.html',
  styleUrls: ['./certification.css']
})
export class CertificationForm implements OnInit {
  certificationForm!: FormGroup;
  verificationForm!: FormGroup;
  isSubmitted = false;
  submitSuccess = false;
  isProcessing = false;
  studentPhotoPreview: string | null = null;
  studentPhotoFile: File | null = null;
  generatedCertificateNumber: string = '';
  isVerified = false;
  verificationError = '';
  isVerifying = false;
  studentData: any = null;

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

  grades = [
    'A+',
    'A',
    'B+',
    'B',
    'C+',
    'C',
    'D',
    'Pass',
    'Fail'
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
  filteredGrades!: Observable<string[]>;
  filteredStates!: Observable<string[]>;
  filteredDistricts!: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    // Set max date for DOB verification (user must be at least 16 years old)
    const today = new Date();
    this.maxDateDOB = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
  }

  maxDateDOB: Date;

  ngOnInit() {
    this.initializeVerificationForm();
    this.initializeForm();

    // Setup autocomplete filtering for courses
    this.filteredCourses = this.certificationForm.get('course')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCourses(value || ''))
    );

    // Setup autocomplete filtering for grades
    this.filteredGrades = this.certificationForm.get('grade')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGrades(value || ''))
    );

    // Setup autocomplete filtering for states
    this.filteredStates = this.certificationForm.get('state')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterStates(value || ''))
    );

    // Setup district filtering based on selected state
    this.certificationForm.get('state')?.valueChanges.subscribe(selectedState => {
      if (selectedState && this.districtsByState[selectedState]) {
        const districts = this.districtsByState[selectedState];
        this.filteredDistricts = this.certificationForm.get('district')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDistricts(value || '', districts))
        );
        this.certificationForm.patchValue({ district: '' });
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

  private _filterGrades(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.grades.filter(grade => grade.toLowerCase().includes(filterValue));
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

  displayGrade(grade: string): string {
    return grade || '';
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
    this.certificationForm = this.fb.group({
      certificateNumber: [{value: '', disabled: true}],
      enrolmentNumber: ['', [Validators.required, Validators.minLength(5)]],
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      course: ['', Validators.required],
      completionDate: ['', Validators.required],
      completionDateFull: ['', Validators.required],
      grade: ['', Validators.required],
      marksObtained: [''],
      totalMarks: [''],
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
    this.certificationForm.patchValue({
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
      
      this.certificationForm.patchValue({
        completionDate: `${day}/${month}/${year}`
      });
    }
  }

  generateCertificateNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    
    return `CERT-${year}-${month}${day}-${randomNum}`;
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
        this.certificationForm.patchValue({ studentPhoto: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.studentPhotoPreview = null;
    this.studentPhotoFile = null;
    this.certificationForm.patchValue({ studentPhoto: '' });
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.certificationForm.controls;
  }

  hasError(fieldName: string): boolean {
    const field = this.certificationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.certificationForm.get(fieldName);
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
    
    if (this.certificationForm.valid) {
      this.isProcessing = true;
      
      this.generatedCertificateNumber = this.generateCertificateNumber();
      this.certificationForm.patchValue({ certificateNumber: this.generatedCertificateNumber });
      
      const formData = {
        ...this.certificationForm.getRawValue(),
        certificateNumber: this.generatedCertificateNumber
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
    const subject = `Certification Form - ${formData.studentName || 'CIPC Student'}`;
    const body = this.formatFormDataForEmail(formData);
    const email = 'cipcvns@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  formatFormDataForEmail(formData: any): string {
    return `
CERTIFICATION FORM SUBMISSION
==============================

CERTIFICATE NUMBER: ${formData.certificateNumber || 'N/A'} (For office use only)

Enrolment Number: ${formData.enrolmentNumber || ''}
Student Name: ${formData.studentName || ''}
Course: ${formData.course || ''}
Completion Date: ${formData.completionDate || ''}
Grade: ${formData.grade || ''}
Marks Obtained: ${formData.marksObtained || ''}
Total Marks: ${formData.totalMarks || ''}

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
    this.generatedCertificateNumber = '';
    this.isVerified = false;
    this.verificationError = '';
    this.studentData = null;
    this.certificationForm.reset();
    this.verificationForm.reset();
    this.initializeForm();
    this.initializeVerificationForm();
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

