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
  isSubmitted = false;
  submitSuccess = false;
  isProcessing = false;
  studentPhotoPreview: string | null = null;
  studentPhotoFile: File | null = null;
  generatedCertificateNumber: string = '';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
    this.certificationForm.reset();
    this.initializeForm();
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

