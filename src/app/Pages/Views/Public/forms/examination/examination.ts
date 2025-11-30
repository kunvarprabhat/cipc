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
  styleUrl: './examination.css'
})
export class ExaminationForm implements OnInit {
  examinationForm!: FormGroup;
  isSubmitted = false;
  submitSuccess = false;
  isProcessing = false;
  studentPhotoPreview: string | null = null;
  studentPhotoFile: File | null = null;
  generatedFormNumber: string = '';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
    this.examinationForm.reset();
    this.initializeForm();
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

