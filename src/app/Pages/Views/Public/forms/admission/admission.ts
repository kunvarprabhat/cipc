import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-admission-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './admission.html',
  styleUrl: './admission.css'
})
export class AdmissionForm implements OnInit {
  admissionForm!: FormGroup;
  isSubmitted = false;
  submitSuccess = false;
  isProcessing = false;
  showDeclarationPopup = false;
  showPaymentPopup = false;
  selectedPaymentMethod: 'online' | 'cash' | null = null;
  paymentAmount: number = 5000; // Default fee amount
  razorpay: any;
  studentPhotoPreview: string | null = null;
  studentPhotoFile: File | null = null;
  generatedEnrolmentNumber: string = '';
  guardianSignature: string = '';
  studentSignature: string = '';
  paymentStatus: 'pending' | 'success' | 'failed' | null = null;
  paymentDetails: {
    method: string;
    amount: number;
    transactionId: string;
    date: string;
  } | null = null;

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
    'Arunachal Pradesh': ['Anjaw', 'Changlang', 'Dibang Valley', 'East Kameng', 'East Siang', 'Kamle', 'Kra Daadi', 'Kurung Kumey', 'Lepa Rada', 'Lohit', 'Longding', 'Lower Dibang Valley', 'Lower Siang', 'Lower Subansiri', 'Namsai', 'Pakke Kessang', 'Papum Pare', 'Shi Yomi', 'Siang', 'Tawang', 'Tirap', 'Upper Dibang Valley', 'Upper Siang', 'Upper Subansiri', 'West Kameng', 'West Siang'],
    'Assam': ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang', 'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Dima Hasao', 'Goalpara', 'Golaghat', 'Hailakandi', 'Hojai', 'Jorhat', 'Kamrup', 'Kamrup Metropolitan', 'Karbi Anglong', 'Karimganj', 'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'],
    'Bihar': ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
    'Chhattisgarh': ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur', 'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba', 'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kachchh', 'Kheda', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
    'Haryana': ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 'Mewat', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 'Yamunanagar'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
    'Jharkhand': ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum', 'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu', 'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega', 'West Singhbhum'],
    'Karnataka': ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikkaballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davangere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    'Kerala': ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'],
    'Madhya Pradesh': ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
    'Maharashtra': ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
    'Manipur': ['Bishnupur', 'Chandel', 'Churachandpur', 'Imphal East', 'Imphal West', 'Jiribam', 'Kakching', 'Kamjong', 'Kangpokpi', 'Noney', 'Pherzawl', 'Senapati', 'Tamenglong', 'Tengnoupal', 'Thoubal', 'Ukhrul'],
    'Meghalaya': ['East Garo Hills', 'East Jaintia Hills', 'East Khasi Hills', 'North Garo Hills', 'Ri Bhoi', 'South Garo Hills', 'South West Garo Hills', 'South West Khasi Hills', 'West Garo Hills', 'West Jaintia Hills', 'West Khasi Hills'],
    'Mizoram': ['Aizawl', 'Champhai', 'Hnahthial', 'Khawzawl', 'Kolasib', 'Lawngtlai', 'Lunglei', 'Mamit', 'Saiha', 'Saitual', 'Serchhip'],
    'Nagaland': ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung', 'Mon', 'Peren', 'Phek', 'Tuensang', 'Wokha', 'Zunheboto'],
    'Odisha': ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak', 'Boudh', 'Cuttack', 'Deogarh', 'Dhenkanal', 'Gajapati', 'Ganjam', 'Jagatsinghpur', 'Jajpur', 'Jharsuguda', 'Kalahandi', 'Kandhamal', 'Kendrapara', 'Kendujhar', 'Khordha', 'Koraput', 'Malkangiri', 'Mayurbhanj', 'Nabarangpur', 'Nayagarh', 'Nuapada', 'Puri', 'Rayagada', 'Sambalpur', 'Subarnapur', 'Sundargarh'],
    'Punjab': ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Nawanshahr', 'Pathankot', 'Patiala', 'Rupnagar', 'Sangrur', 'SAS Nagar', 'Tarn Taran'],
    'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
    'Sikkim': ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],
    'Tamil Nadu': ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
    'Telangana': ['Adilabad', 'Bhadradri Kothagudem', 'Hyderabad', 'Jagtial', 'Jangaon', 'Jayashankar Bhupalapally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 'Komaram Bheem', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal Rural', 'Warangal Urban', 'Yadadri Bhuvanagiri'],
    'Tripura': ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'],
    'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
    'Uttarakhand': ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 'Uttarkashi'],
    'West Bengal': ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
    'Delhi': ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South Delhi', 'South East Delhi', 'South West Delhi', 'West Delhi'],
    'Jammu and Kashmir': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Doda', 'Ganderbal', 'Jammu', 'Kathua', 'Kishtwar', 'Kulgam', 'Kupwara', 'Poonch', 'Pulwama', 'Rajouri', 'Ramban', 'Reasi', 'Samba', 'Shopian', 'Srinagar', 'Udhampur'],
    'Ladakh': ['Kargil', 'Leh'],
    'Puducherry': ['Karaikal', 'Mahe', 'Puducherry', 'Yanam']
  };

  filteredCourses!: Observable<string[]>;
  filteredStates!: Observable<string[]>;
  filteredDistricts!: Observable<string[]>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeForm();

    // Setup autocomplete filtering for courses
    this.filteredCourses = this.admissionForm.get('courseOptedFor')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = typeof value === 'string' ? value : '';
        return this._filterCourses(filterValue);
      })
    );

    // Setup autocomplete filtering for states
    this.filteredStates = this.admissionForm.get('state')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const filterValue = typeof value === 'string' ? value : '';
        return this._filterStates(filterValue);
      })
    );

    // Setup district filtering based on selected state
    this.admissionForm.get('state')?.valueChanges.subscribe(selectedState => {
      if (selectedState && this.districtsByState[selectedState]) {
        const districts = this.districtsByState[selectedState];
        // Setup autocomplete filtering for districts
        this.filteredDistricts = this.admissionForm.get('district')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const filterValue = typeof value === 'string' ? value : '';
            return this._filterDistricts(filterValue, districts);
          })
        );
        // Reset district when state changes
        this.admissionForm.patchValue({ district: '' });
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

  private _filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));
  }

  private _filterDistricts(value: string, districts: string[]): string[] {
    const filterValue = value.toLowerCase();
    return districts.filter(district => district.toLowerCase().includes(filterValue));
  }

  displayCourse(course: string | null): string {
    return course ? course : '';
  }

  displayState(state: string | null): string {
    return state ? state : '';
  }

  displayDistrict(district: string | null): string {
    return district ? district : '';
  }

  initializeForm() {
    this.admissionForm = this.fb.group({
      enrolmentNumber: [{value: '', disabled: true}],
      courseAppliedCIPC: [false],
      courseAppliedUniversity: [false],
      courseAppliedSubject: [''],
      nameInCapital: ['', [Validators.required, Validators.minLength(3)]],
      fathersName: ['', [Validators.required, Validators.minLength(3)]],
      sex: ['', Validators.required],
      nationality: ['', Validators.required],
      occupation: [''],
      dateOfBirthFull: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])$/)]],
      monthOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      yearOfBirth: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      courseOptedFor: ['', Validators.required],
      schoolCollege: ['', Validators.required],
      detailsOfQualification: ['', Validators.required],
      fullPostalAddress: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobileNo1: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      mobileNo2: [''],
      email: ['', [Validators.required, Validators.email]],
      studentPhoto: ['']
    });
  }

  onDateSelected(event: any) {
    if (event && event.value) {
      const selectedDate = new Date(event.value);
      if (!isNaN(selectedDate.getTime())) {
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const year = String(selectedDate.getFullYear());
        
        this.admissionForm.patchValue({
          dateOfBirth: day,
          monthOfBirth: month,
          yearOfBirth: year,
          dateOfBirthFull: selectedDate
        }, { emitEvent: false });
      }
    }
  }

  syncDateFromManualInputs() {
    const day = this.admissionForm.get('dateOfBirth')?.value;
    const month = this.admissionForm.get('monthOfBirth')?.value;
    const year = this.admissionForm.get('yearOfBirth')?.value;
    
    if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
      const dateStr = `${year}-${month}-${day}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        this.admissionForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
      }
    }
  }

  generateEnrolmentNumber(): string {
    // Generate format: CIPC-YYYY-MMDD-HHMMSS
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Alternative: CIPC-YYYY-XXXXX (random 5 digits)
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    
    return `CIPC-${year}-${month}${day}-${randomNum}`;
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png|gif)/)) {
        alert('Please select a valid image file (JPEG, JPG, PNG, GIF)');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      this.studentPhotoFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setTimeout(() => {
          this.studentPhotoPreview = e.target.result;
          this.admissionForm.patchValue({ studentPhoto: e.target.result });
          this.cdr.detectChanges();
        }, 0);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.studentPhotoPreview = null;
    this.studentPhotoFile = null;
    this.admissionForm.patchValue({ studentPhoto: '' });
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.admissionForm.controls;
  }

  // Check if field has error
  hasError(fieldName: string): boolean {
    const field = this.admissionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.isSubmitted));
  }

  // Get error message
  getErrorMessage(fieldName: string): string {
    const field = this.admissionForm.get(fieldName);
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
        if (fieldName === 'mobileNo1') {
          return 'Invalid mobile number';
        }
        if (fieldName.includes('Birth')) {
          return 'Invalid date format';
        }
      }
      if (field.errors['email']) {
        return 'Invalid email address';
      }
    }
    return '';
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.isSubmitted = true;
    
    // Mark all fields as touched to show validation errors
    Object.keys(this.admissionForm.controls).forEach(key => {
      const control = this.admissionForm.get(key);
      if (control && !control.disabled) {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
    
    // Check if dateOfBirthFull is empty but manual date fields are filled
    if (!this.admissionForm.get('dateOfBirthFull')?.value && 
        this.admissionForm.get('dateOfBirth')?.value && 
        this.admissionForm.get('monthOfBirth')?.value && 
        this.admissionForm.get('yearOfBirth')?.value) {
      // Try to create date from manual inputs
      const day = this.admissionForm.get('dateOfBirth')?.value;
      const month = this.admissionForm.get('monthOfBirth')?.value;
      const year = this.admissionForm.get('yearOfBirth')?.value;
      const dateStr = `${year}-${month}-${day}`;
      const dateObj = new Date(dateStr);
      if (!isNaN(dateObj.getTime())) {
        this.admissionForm.patchValue({ dateOfBirthFull: dateObj }, { emitEvent: false });
      }
    }
    
    console.log('Form Valid:', this.admissionForm.valid);
    console.log('Form Errors:', this.getFormErrors());
    console.log('Form Status:', this.admissionForm.status);
    console.log('Form Values:', this.admissionForm.value);
    
    if (this.admissionForm.valid) {
      this.isProcessing = true;
      
      // Generate enrolment number
      this.generatedEnrolmentNumber = this.generateEnrolmentNumber();
      this.admissionForm.patchValue({ enrolmentNumber: this.generatedEnrolmentNumber });
      
      // Get form data including enrolment number
      const formData = {
        ...this.admissionForm.getRawValue(),
        enrolmentNumber: this.generatedEnrolmentNumber
      };
      
      // Process form submission
      console.log('Form Data:', formData);
      
      // Show declaration popup immediately after successful submission
      this.isProcessing = false;
      this.submitSuccess = true;
      this.showDeclarationPopup = true;
      this.cdr.detectChanges();
    } else {
      // Form is invalid, show error message and scroll to first error
      const firstError = Object.keys(this.f).find(key => this.f[key].invalid);
      if (firstError) {
        const errorMessage = this.getErrorMessage(firstError);
        alert(`Please fill all required fields correctly. First error: ${firstError} - ${errorMessage}`);
        const element = document.querySelector(`[formControlName="${firstError}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        alert('Please fill all required fields correctly.');
      }
      this.isProcessing = false;
    }
  }

  getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.admissionForm.controls).forEach(key => {
      const control = this.admissionForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  printForm() {
    window.print();
  }

  downloadForm() {
    // Trigger print which allows saving as PDF
    window.print();
  }

  emailForm(formData: any) {
    // Create email subject
    const subject = `Admission Form - ${formData.nameInCapital || 'CIPC Student'}`;
    
    // Create email body with form data
    const body = this.formatFormDataForEmail(formData);
    
    // Create mailto link
    const email = 'cipcvns@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  }

  formatFormDataForEmail(formData: any): string {
    const dob = `${formData.dateOfBirth || ''}/${formData.monthOfBirth || ''}/${formData.yearOfBirth || ''}`;
    const courseApplied = [];
    if (formData.courseAppliedCIPC) courseApplied.push('CIPC');
    if (formData.courseAppliedUniversity) courseApplied.push('UNIVERSITY');
    
    let emailBody = `
ADMISSION FORM SUBMISSION
========================

ENROLMENT NUMBER: ${formData.enrolmentNumber || 'N/A'} (For office use only)

COURSE APPLIED FOR: ${courseApplied.join(', ')} ${formData.courseAppliedSubject ? '- ' + formData.courseAppliedSubject : ''}

Name in CAPITAL LETTERS: ${formData.nameInCapital || ''}
Father's Name: ${formData.fathersName || ''}
Sex: ${formData.sex || ''}
Nationality: ${formData.nationality || ''}
Occupation: ${formData.occupation || ''}
Date of Birth: ${dob}

Course opted for: ${formData.courseOptedFor || ''}
School/College: ${formData.schoolCollege || ''}
Details of Qualification: ${formData.detailsOfQualification || ''}

Full Postal Address: ${formData.fullPostalAddress || ''}
District: ${formData.district || ''}
State: ${formData.state || ''}
Pin Code: ${formData.pinCode || ''}

Mobile No. 1: ${formData.mobileNo1 || ''}
Mobile No. 2: ${formData.mobileNo2 || ''}
Email: ${formData.email || 'N/A'}
    `.trim();

    // Add payment details if available
    if (formData.paymentMethod && this.paymentDetails) {
      emailBody += `


PAYMENT DETAILS
==============
Payment Method: ${formData.paymentMethod === 'online' ? 'Online Payment' : 'Cash Payment'}
Amount Paid: ₹${formData.paymentAmount || this.paymentDetails.amount}
Transaction ID: ${formData.transactionId || this.paymentDetails.transactionId}
Payment Date: ${formData.paymentDate ? new Date(formData.paymentDate).toLocaleDateString('en-GB') : this.paymentDetails.date}
      `;
    }

    // Add declaration and signatures
    if (formData.guardianSignature || formData.studentSignature) {
      emailBody += `


DECLARATION
===========
Guardian Signature: ${formData.guardianSignature || 'N/A'}
Student Signature: ${formData.studentSignature || 'N/A'}
Date: ${this.getCurrentDate()}
      `;
    }

    emailBody += `


---
Submitted on: ${new Date().toLocaleString()}
    `;

    return emailBody.trim();
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  closeDeclarationPopup() {
    this.showDeclarationPopup = false;
  }

  acceptDeclaration() {
    if (this.guardianSignature.trim() && this.studentSignature.trim()) {
      // Close declaration popup and show payment popup
      this.closeDeclarationPopup();
      setTimeout(() => {
        this.showPaymentPopup = true;
      }, 300);
    } else {
      alert('Please provide both Guardian and Student signatures');
    }
  }

  selectPaymentMethod(method: 'online' | 'cash') {
    this.selectedPaymentMethod = method;
  }

  proceedWithPayment() {
    if (this.selectedPaymentMethod === 'online') {
      this.initiateRazorpayPayment();
    } else if (this.selectedPaymentMethod === 'cash') {
      this.handleCashPayment();
    } else {
      alert('Please select a payment method');
    }
  }

  initiateRazorpayPayment() {
    // Check if Razorpay is loaded
    if (typeof (window as any).Razorpay === 'undefined') {
      alert('Payment gateway is loading. Please wait a moment and try again.');
      return;
    }

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay Key ID
      amount: this.paymentAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'CIPC Paramedical Council',
      description: `Admission Fee - ${this.admissionForm.get('nameInCapital')?.value || 'Student'}`,
      image: 'Assets/logos/image.png',
      order_id: '', // You'll get this from your backend
      handler: (response: any) => {
        // Payment success
        this.paymentStatus = 'success';
        this.completePaymentProcess('online', response.razorpay_payment_id);
      },
      prefill: {
        name: this.admissionForm.get('nameInCapital')?.value || '',
        email: this.admissionForm.get('email')?.value || '',
        contact: this.admissionForm.get('mobileNo1')?.value || ''
      },
      notes: {
        enrolment_number: this.generatedEnrolmentNumber,
        course: this.admissionForm.get('courseOptedFor')?.value || ''
      },
      theme: {
        color: '#2563eb'
      },
      modal: {
        ondismiss: () => {
          // User closed the payment modal
          console.log('Payment cancelled by user');
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      // Payment failed
      this.paymentStatus = 'failed';
      alert('Payment failed. Please try again.');
      console.error('Payment failed:', response);
    });

    rzp.open();
  }

  handleCashPayment() {
    // For cash payment, show confirmation
    if (confirm('You have selected Cash Payment. Please visit the institute to complete the payment. Do you want to proceed?')) {
      this.paymentStatus = 'success';
      this.completePaymentProcess('cash', 'CASH-' + Date.now());
    }
  }

  completePaymentProcess(method: string, transactionId: string) {
    // Store payment details
    this.paymentDetails = {
      method: method,
      amount: this.paymentAmount,
      transactionId: transactionId,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };
    
    // Close payment popup first
    this.closePaymentPopup();
    
    // Wait a bit for UI to update, then print/download/email
    setTimeout(() => {
      // Get form data
      const formData = {
        ...this.admissionForm.getRawValue(),
        enrolmentNumber: this.generatedEnrolmentNumber,
        guardianSignature: this.guardianSignature,
        studentSignature: this.studentSignature,
        paymentMethod: method,
        paymentAmount: this.paymentAmount,
        transactionId: transactionId,
        paymentDate: new Date().toISOString()
      };
      
      // Print form (includes payment details)
      this.printForm();
      
      // Download as PDF (via print dialog)
      setTimeout(() => {
        this.downloadForm();
      }, 500);
      
      // Email form
      setTimeout(() => {
        this.emailForm(formData);
      }, 1000);
      
      // Show success message
      this.submitSuccess = true;
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 500);
  }

  closePaymentPopup() {
    this.showPaymentPopup = false;
    this.selectedPaymentMethod = null;
    this.paymentStatus = null;
  }

  printDeclaration() {
    window.print();
  }

  resetForm() {
    this.isSubmitted = false;
    this.submitSuccess = false;
    this.isProcessing = false;
    this.showDeclarationPopup = false;
    this.showPaymentPopup = false;
    this.selectedPaymentMethod = null;
    this.paymentStatus = null;
    this.paymentDetails = null;
    this.guardianSignature = '';
    this.studentSignature = '';
    this.studentPhotoPreview = null;
    this.studentPhotoFile = null;
    this.generatedEnrolmentNumber = '';
    this.admissionForm.reset();
    this.initializeForm();
    const fileInput = document.getElementById('studentPhotoInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
