import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../../../Services/toast.service';

interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  joinDate: string;
  phone: string;
  salary?: number;
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-faculty-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './faculty-list.html',
  styleUrl: './faculty-list.css'
})
export class FacultyList {
  faculty: Faculty[] = [
    {
      id: '1', employeeId: 'EMP001', name: 'Dr. Sunita Verma', email: 'sunita.verma@cipc.edu',
      department: 'Nursing', designation: 'Professor', qualification: 'PhD in Nursing',
      experience: 15, joinDate: '2018-08-01', phone: '+91 9876543220', salary: 85000, status: 'active'
    },
    {
      id: '2', employeeId: 'EMP002', name: 'Mr. Rajesh Kumar', email: 'rajesh.kumar@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Associate Professor', qualification: 'MSc MLT',
      experience: 10, joinDate: '2020-01-15', phone: '+91 9876543221', salary: 65000, status: 'active'
    },
    {
      id: '3', employeeId: 'EMP003', name: 'Dr. Priya Sharma', email: 'priya.sharma@cipc.edu',
      department: 'Physiotherapy', designation: 'Assistant Professor', qualification: 'MPT',
      experience: 8, joinDate: '2021-03-10', phone: '+91 9876543222', salary: 55000, status: 'active'
    },
    {
      id: '4', employeeId: 'EMP004', name: 'Dr. Amit Singh', email: 'amit.singh@cipc.edu',
      department: 'Radiology', designation: 'Professor', qualification: 'MD Radiology',
      experience: 18, joinDate: '2017-05-20', phone: '+91 9876543223', salary: 90000, status: 'active'
    },
    {
      id: '5', employeeId: 'EMP005', name: 'Ms. Kavita Patel', email: 'kavita.patel@cipc.edu',
      department: 'Nursing', designation: 'Associate Professor', qualification: 'MSc Nursing',
      experience: 12, joinDate: '2019-02-14', phone: '+91 9876543224', salary: 70000, status: 'active'
    },
    {
      id: '6', employeeId: 'EMP006', name: 'Dr. Ramesh Yadav', email: 'ramesh.yadav@cipc.edu',
      department: 'Pharmacy', designation: 'Professor', qualification: 'PhD Pharmacy',
      experience: 20, joinDate: '2016-07-01', phone: '+91 9876543225', salary: 95000, status: 'active'
    },
    {
      id: '7', employeeId: 'EMP007', name: 'Ms. Anjali Desai', email: 'anjali.desai@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Assistant Professor', qualification: 'MSc MLT',
      experience: 7, joinDate: '2021-09-15', phone: '+91 9876543226', salary: 52000, status: 'active'
    },
    {
      id: '8', employeeId: 'EMP008', name: 'Dr. Vikram Mehta', email: 'vikram.mehta@cipc.edu',
      department: 'Physiotherapy', designation: 'Associate Professor', qualification: 'MPT, PhD',
      experience: 14, joinDate: '2018-11-20', phone: '+91 9876543227', salary: 75000, status: 'active'
    },
    {
      id: '9', employeeId: 'EMP009', name: 'Ms. Sneha Reddy', email: 'sneha.reddy@cipc.edu',
      department: 'Nursing', designation: 'Lecturer', qualification: 'BSc Nursing',
      experience: 5, joinDate: '2022-01-10', phone: '+91 9876543228', salary: 45000, status: 'active'
    },
    {
      id: '10', employeeId: 'EMP010', name: 'Dr. Manoj Tiwari', email: 'manoj.tiwari@cipc.edu',
      department: 'Radiology', designation: 'Associate Professor', qualification: 'MD Radiology',
      experience: 11, joinDate: '2020-06-05', phone: '+91 9876543229', salary: 68000, status: 'active'
    },
    {
      id: '11', employeeId: 'EMP011', name: 'Ms. Pooja Gupta', email: 'pooja.gupta@cipc.edu',
      department: 'Pharmacy', designation: 'Assistant Professor', qualification: 'MPharm',
      experience: 6, joinDate: '2021-12-01', phone: '+91 9876543230', salary: 50000, status: 'active'
    },
    {
      id: '12', employeeId: 'EMP012', name: 'Dr. Sanjay Malhotra', email: 'sanjay.malhotra@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Professor', qualification: 'PhD MLT',
      experience: 16, joinDate: '2018-03-15', phone: '+91 9876543231', salary: 88000, status: 'active'
    },
    {
      id: '13', employeeId: 'EMP013', name: 'Ms. Radha Iyer', email: 'radha.iyer@cipc.edu',
      department: 'Physiotherapy', designation: 'Lecturer', qualification: 'BPT',
      experience: 4, joinDate: '2022-08-20', phone: '+91 9876543232', salary: 42000, status: 'active'
    },
    {
      id: '14', employeeId: 'EMP014', name: 'Dr. Neeraj Kapoor', email: 'neeraj.kapoor@cipc.edu',
      department: 'Radiology', designation: 'Assistant Professor', qualification: 'MD Radiology',
      experience: 9, joinDate: '2020-10-12', phone: '+91 9876543233', salary: 60000, status: 'active'
    },
    {
      id: '15', employeeId: 'EMP015', name: 'Ms. Meera Joshi', email: 'meera.joshi@cipc.edu',
      department: 'Nursing', designation: 'Senior Lecturer', qualification: 'MSc Nursing',
      experience: 8, joinDate: '2021-04-18', phone: '+91 9876543234', salary: 58000, status: 'active'
    },
    {
      id: '16', employeeId: 'EMP016', name: 'Dr. Arjun Nair', email: 'arjun.nair@cipc.edu',
      department: 'Pharmacy', designation: 'Associate Professor', qualification: 'PhD Pharmacy',
      experience: 13, joinDate: '2019-07-25', phone: '+91 9876543235', salary: 72000, status: 'active'
    },
    {
      id: '17', employeeId: 'EMP017', name: 'Ms. Divya Menon', email: 'divya.menon@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Lecturer', qualification: 'BSc MLT',
      experience: 3, joinDate: '2023-01-05', phone: '+91 9876543236', salary: 40000, status: 'active'
    },
    {
      id: '18', employeeId: 'EMP018', name: 'Dr. Karan Shah', email: 'karan.shah@cipc.edu',
      department: 'Physiotherapy', designation: 'Professor', qualification: 'MPT, PhD',
      experience: 17, joinDate: '2017-09-10', phone: '+91 9876543237', salary: 92000, status: 'active'
    },
    {
      id: '19', employeeId: 'EMP019', name: 'Ms. Shruti Agarwal', email: 'shruti.agarwal@cipc.edu',
      department: 'Nursing', designation: 'Assistant Professor', qualification: 'MSc Nursing',
      experience: 7, joinDate: '2021-11-30', phone: '+91 9876543238', salary: 54000, status: 'active'
    },
    {
      id: '20', employeeId: 'EMP020', name: 'Dr. Rohit Verma', email: 'rohit.verma@cipc.edu',
      department: 'Radiology', designation: 'Professor', qualification: 'MD Radiology',
      experience: 19, joinDate: '2016-12-15', phone: '+91 9876543239', salary: 98000, status: 'active'
    },
    {
      id: '21', employeeId: 'EMP021', name: 'Ms. Nisha Rao', email: 'nisha.rao@cipc.edu',
      department: 'Pharmacy', designation: 'Lecturer', qualification: 'BPharm',
      experience: 2, joinDate: '2023-06-01', phone: '+91 9876543240', salary: 38000, status: 'active'
    },
    {
      id: '22', employeeId: 'EMP022', name: 'Dr. Sameer Khan', email: 'sameer.khan@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Associate Professor', qualification: 'MSc MLT',
      experience: 10, joinDate: '2020-02-28', phone: '+91 9876543241', salary: 66000, status: 'active'
    },
    {
      id: '23', employeeId: 'EMP023', name: 'Ms. Ananya Das', email: 'ananya.das@cipc.edu',
      department: 'Physiotherapy', designation: 'Assistant Professor', qualification: 'MPT',
      experience: 6, joinDate: '2021-05-12', phone: '+91 9876543242', salary: 51000, status: 'active'
    },
    {
      id: '24', employeeId: 'EMP024', name: 'Dr. Aditya Chaturvedi', email: 'aditya.chaturvedi@cipc.edu',
      department: 'Nursing', designation: 'Professor', qualification: 'PhD Nursing',
      experience: 21, joinDate: '2015-04-20', phone: '+91 9876543243', salary: 100000, status: 'active'
    },
    {
      id: '25', employeeId: 'EMP025', name: 'Ms. Ishita Banerjee', email: 'ishita.banerjee@cipc.edu',
      department: 'Radiology', designation: 'Lecturer', qualification: 'BSc Radiology',
      experience: 3, joinDate: '2023-03-15', phone: '+91 9876543244', salary: 41000, status: 'active'
    },
    {
      id: '26', employeeId: 'EMP026', name: 'Dr. Varun Agarwal', email: 'varun.agarwal@cipc.edu',
      department: 'Pharmacy', designation: 'Assistant Professor', qualification: 'MPharm',
      experience: 8, joinDate: '2021-08-22', phone: '+91 9876543245', salary: 56000, status: 'active'
    },
    {
      id: '27', employeeId: 'EMP027', name: 'Ms. Tanvi Mehta', email: 'tanvi.mehta@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Senior Lecturer', qualification: 'MSc MLT',
      experience: 9, joinDate: '2020-11-08', phone: '+91 9876543246', salary: 62000, status: 'active'
    },
    {
      id: '28', employeeId: 'EMP028', name: 'Dr. Rahul Deshmukh', email: 'rahul.deshmukh@cipc.edu',
      department: 'Physiotherapy', designation: 'Associate Professor', qualification: 'MPT, PhD',
      experience: 12, joinDate: '2019-09-14', phone: '+91 9876543247', salary: 71000, status: 'active'
    },
    {
      id: '29', employeeId: 'EMP029', name: 'Ms. Kritika Sharma', email: 'kritika.sharma@cipc.edu',
      department: 'Nursing', designation: 'Lecturer', qualification: 'BSc Nursing',
      experience: 4, joinDate: '2022-07-05', phone: '+91 9876543248', salary: 44000, status: 'active'
    },
    {
      id: '30', employeeId: 'EMP030', name: 'Dr. Abhishek Pandey', email: 'abhishek.pandey@cipc.edu',
      department: 'Radiology', designation: 'Associate Professor', qualification: 'MD Radiology',
      experience: 11, joinDate: '2020-04-30', phone: '+91 9876543249', salary: 69000, status: 'active'
    },
    {
      id: '31', employeeId: 'EMP031', name: 'Ms. Swati Mishra', email: 'swati.mishra@cipc.edu',
      department: 'Pharmacy', designation: 'Assistant Professor', qualification: 'MPharm',
      experience: 7, joinDate: '2021-10-18', phone: '+91 9876543250', salary: 53000, status: 'active'
    },
    {
      id: '32', employeeId: 'EMP032', name: 'Dr. Mohit Jain', email: 'mohit.jain@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Professor', qualification: 'PhD MLT',
      experience: 15, joinDate: '2018-06-12', phone: '+91 9876543251', salary: 86000, status: 'active'
    },
    {
      id: '33', employeeId: 'EMP033', name: 'Ms. Riya Kapoor', email: 'riya.kapoor@cipc.edu',
      department: 'Physiotherapy', designation: 'Lecturer', qualification: 'BPT',
      experience: 2, joinDate: '2023-09-20', phone: '+91 9876543252', salary: 39000, status: 'active'
    },
    {
      id: '34', employeeId: 'EMP034', name: 'Dr. Nitin Reddy', email: 'nitin.reddy@cipc.edu',
      department: 'Nursing', designation: 'Associate Professor', qualification: 'MSc Nursing',
      experience: 13, joinDate: '2019-01-25', phone: '+91 9876543253', salary: 73000, status: 'active'
    },
    {
      id: '35', employeeId: 'EMP035', name: 'Ms. Aarti Singh', email: 'aarti.singh@cipc.edu',
      department: 'Radiology', designation: 'Assistant Professor', qualification: 'MD Radiology',
      experience: 8, joinDate: '2021-02-14', phone: '+91 9876543254', salary: 57000, status: 'active'
    },
    {
      id: '36', employeeId: 'EMP036', name: 'Dr. Gaurav Patel', email: 'gaurav.patel@cipc.edu',
      department: 'Pharmacy', designation: 'Professor', qualification: 'PhD Pharmacy',
      experience: 18, joinDate: '2017-08-05', phone: '+91 9876543255', salary: 94000, status: 'active'
    },
    {
      id: '37', employeeId: 'EMP037', name: 'Ms. Deepika Nair', email: 'deepika.nair@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Lecturer', qualification: 'BSc MLT',
      experience: 3, joinDate: '2023-02-10', phone: '+91 9876543256', salary: 40500, status: 'active'
    },
    {
      id: '38', employeeId: 'EMP038', name: 'Dr. Harsh Varma', email: 'harsh.varma@cipc.edu',
      department: 'Physiotherapy', designation: 'Associate Professor', qualification: 'MPT',
      experience: 10, joinDate: '2020-07-22', phone: '+91 9876543257', salary: 67000, status: 'active'
    },
    {
      id: '39', employeeId: 'EMP039', name: 'Ms. Preeti Iyer', email: 'preeti.iyer@cipc.edu',
      department: 'Nursing', designation: 'Senior Lecturer', qualification: 'MSc Nursing',
      experience: 9, joinDate: '2020-12-08', phone: '+91 9876543258', salary: 64000, status: 'active'
    },
    {
      id: '40', employeeId: 'EMP040', name: 'Dr. Yash Malhotra', email: 'yash.malhotra@cipc.edu',
      department: 'Radiology', designation: 'Professor', qualification: 'MD Radiology',
      experience: 16, joinDate: '2018-10-15', phone: '+91 9876543259', salary: 89000, status: 'active'
    },
    {
      id: '41', employeeId: 'EMP041', name: 'Ms. Sakshi Joshi', email: 'sakshi.joshi@cipc.edu',
      department: 'Pharmacy', designation: 'Assistant Professor', qualification: 'MPharm',
      experience: 6, joinDate: '2021-06-28', phone: '+91 9876543260', salary: 50500, status: 'active'
    },
    {
      id: '42', employeeId: 'EMP042', name: 'Dr. Kunal Shah', email: 'kunal.shah@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Associate Professor', qualification: 'MSc MLT',
      experience: 11, joinDate: '2020-03-18', phone: '+91 9876543261', salary: 70000, status: 'active'
    },
    {
      id: '43', employeeId: 'EMP043', name: 'Ms. Neha Agarwal', email: 'neha.agarwal@cipc.edu',
      department: 'Physiotherapy', designation: 'Lecturer', qualification: 'BPT',
      experience: 4, joinDate: '2022-05-12', phone: '+91 9876543262', salary: 43000, status: 'active'
    },
    {
      id: '44', employeeId: 'EMP044', name: 'Dr. Prateek Tiwari', email: 'prateek.tiwari@cipc.edu',
      department: 'Nursing', designation: 'Assistant Professor', qualification: 'MSc Nursing',
      experience: 7, joinDate: '2021-09-25', phone: '+91 9876543263', salary: 54500, status: 'active'
    },
    {
      id: '45', employeeId: 'EMP045', name: 'Ms. Anushka Rao', email: 'anushka.rao@cipc.edu',
      department: 'Radiology', designation: 'Lecturer', qualification: 'BSc Radiology',
      experience: 2, joinDate: '2023-07-08', phone: '+91 9876543264', salary: 38500, status: 'active'
    },
    {
      id: '46', employeeId: 'EMP046', name: 'Dr. Siddharth Menon', email: 'siddharth.menon@cipc.edu',
      department: 'Pharmacy', designation: 'Associate Professor', qualification: 'PhD Pharmacy',
      experience: 14, joinDate: '2019-04-30', phone: '+91 9876543265', salary: 76000, status: 'active'
    },
    {
      id: '47', employeeId: 'EMP047', name: 'Ms. Vaishali Das', email: 'vaishali.das@cipc.edu',
      department: 'Medical Laboratory Technology', designation: 'Senior Lecturer', qualification: 'MSc MLT',
      experience: 8, joinDate: '2021-01-20', phone: '+91 9876543266', salary: 59000, status: 'active'
    },
    {
      id: '48', employeeId: 'EMP048', name: 'Dr. Akash Chaturvedi', email: 'akash.chaturvedi@cipc.edu',
      department: 'Physiotherapy', designation: 'Professor', qualification: 'MPT, PhD',
      experience: 19, joinDate: '2016-11-10', phone: '+91 9876543267', salary: 96000, status: 'active'
    },
    {
      id: '49', employeeId: 'EMP049', name: 'Ms. Pallavi Banerjee', email: 'pallavi.banerjee@cipc.edu',
      department: 'Nursing', designation: 'Lecturer', qualification: 'BSc Nursing',
      experience: 3, joinDate: '2023-04-15', phone: '+91 9876543268', salary: 41500, status: 'active'
    },
    {
      id: '50', employeeId: 'EMP050', name: 'Dr. Rohan Desai', email: 'rohan.desai@cipc.edu',
      department: 'Radiology', designation: 'Associate Professor', qualification: 'MD Radiology',
      experience: 12, joinDate: '2019-08-28', phone: '+91 9876543269', salary: 74000, status: 'active'
    }
  ];

  showAddForm = false;
  showEditForm = false;
  showViewModal = false;
  searchTerm = '';
  selectedDepartment = '';
  editingFaculty: Faculty | null = null;
  viewingFaculty: Faculty | null = null;
  deleteConfirmId: string | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  departments = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Senior Lecturer'];

  maxDate: string;

  constructor(private toastService: ToastService) {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  get filteredFaculty(): Faculty[] {
    return this.faculty.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || member.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get paginatedFaculty(): Faculty[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredFaculty.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredFaculty.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (current > 3) {
        pages.push(-1); // Ellipsis
      }
      
      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (current < total - 2) {
        pages.push(-1); // Ellipsis
      }
      
      // Show last page
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
    this.currentPage = 1; // Reset to first page when search/filter changes
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.showEditForm = false;
      this.editingFaculty = null;
    }
  }

  viewFaculty(faculty: Faculty) {
    this.viewingFaculty = { ...faculty };
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.viewingFaculty = null;
  }

  editFaculty(faculty: Faculty) {
    this.editingFaculty = { ...faculty };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  closeEditForm() {
    this.showEditForm = false;
    this.editingFaculty = null;
  }

  deleteFaculty(id: string) {
    this.deleteConfirmId = id;
  }

  confirmDelete() {
    if (this.deleteConfirmId) {
      const faculty = this.faculty.find(f => f.id === this.deleteConfirmId);
      if (faculty) {
        this.faculty = this.faculty.filter(f => f.id !== this.deleteConfirmId);
        this.toastService.success(`Faculty member ${faculty.name} deleted successfully!`);
      }
      this.deleteConfirmId = null;
    }
  }

  cancelDelete() {
    this.deleteConfirmId = null;
  }

  onSubmitFaculty(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      
      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        this.toastService.error('Please enter a valid email address.');
        return;
      }

      // Validate phone number (should be 10 digits)
      const phonePattern = /^[\d\s\-\+\(\)]+$/;
      if (!phonePattern.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
        this.toastService.error('Please enter a valid phone number.');
        return;
      }

      // Check for duplicate employee ID
      const duplicateId = this.faculty.find(f => 
        f.employeeId.toLowerCase() === formData.employeeId.toLowerCase() && 
        (!this.editingFaculty || f.id !== this.editingFaculty.id)
      );
      if (duplicateId) {
        this.toastService.error('Employee ID already exists. Please use a different ID.');
        return;
      }

      // Check for duplicate email
      const duplicateEmail = this.faculty.find(f => 
        f.email.toLowerCase() === formData.email.toLowerCase() && 
        (!this.editingFaculty || f.id !== this.editingFaculty.id)
      );
      if (duplicateEmail) {
        this.toastService.error('Email already exists. Please use a different email.');
        return;
      }
      
      if (this.editingFaculty) {
        // Update existing faculty
        const index = this.faculty.findIndex(f => f.id === this.editingFaculty!.id);
        if (index !== -1) {
          this.faculty[index] = {
            ...this.faculty[index],
            ...formData,
            id: this.editingFaculty.id,
            status: this.faculty[index].status // Preserve status
          };
          this.toastService.success(`Faculty member ${formData.name} updated successfully!`);
        }
        this.closeEditForm();
      } else {
        // Add new faculty
        const newFaculty: Faculty = {
          id: Date.now().toString(),
          ...formData,
          status: 'active'
        };
        this.faculty.push(newFaculty);
        this.toastService.success(`Faculty member ${formData.name} added successfully!`);
        this.toggleAddForm();
      }
      
      form.reset();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      this.toastService.error('Please fill all required fields correctly.');
    }
  }

  exportData() {
    if (this.filteredFaculty.length === 0) {
      this.toastService.warning('No data to export. Please adjust your search or filter criteria.');
      return;
    }

    try {
      const csvContent = this.convertToCSV(this.filteredFaculty);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `faculty_data_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      this.toastService.success(`${this.filteredFaculty.length} faculty member(s) exported successfully!`);
    } catch (error) {
      this.toastService.error('Failed to export data. Please try again.');
      console.error('Export error:', error);
    }
  }

  convertToCSV(data: Faculty[]): string {
    const headers = ['Employee ID', 'Name', 'Email', 'Phone', 'Department', 'Designation', 'Qualification', 'Experience', 'Join Date', 'Salary', 'Status'];
    const rows = data.map(f => [
      f.employeeId,
      f.name,
      f.email,
      f.phone,
      f.department,
      f.designation,
      f.qualification,
      f.experience.toString(),
      f.joinDate,
      f.salary?.toString() || '',
      f.status
    ]);
    
    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
  }

  toggleStatus(faculty: Faculty) {
    const index = this.faculty.findIndex(f => f.id === faculty.id);
    if (index !== -1) {
      this.faculty[index].status = this.faculty[index].status === 'active' ? 'inactive' : 'active';
      const status = this.faculty[index].status;
      this.toastService.success(`Faculty member ${faculty.name} marked as ${status}!`);
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredFaculty.length);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }
}
