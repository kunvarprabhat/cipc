import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  status: 'active' | 'inactive';
}
@Component({
  selector: 'app-faculty-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './faculty-list.html',
  styleUrl: './faculty-list.css'
})
export class FacultyList {
faculty: Faculty[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Sunita Verma',
      email: 'sunita.verma@cipc.edu',
      department: 'Nursing',
      designation: 'Professor',
      qualification: 'PhD in Nursing',
      experience: 15,
      joinDate: '2018-08-01',
      phone: '+91 9876543220',
      status: 'active',
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Mr. Rajesh Kumar',
      email: 'rajesh.kumar@cipc.edu',
      department: 'Medical Laboratory Technology',
      designation: 'Associate Professor',
      qualification: 'MSc MLT',
      experience: 10,
      joinDate: '2020-01-15',
      phone: '+91 9876543221',
      status: 'active',
    }
  ];

  showAddForm = false;
  searchTerm = '';
  selectedDepartment = '';

  departments = ['Nursing', 'Medical Laboratory Technology', 'Physiotherapy', 'Radiology', 'Pharmacy'];
  designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Senior Lecturer'];

  get filteredFaculty(): Faculty[] {
    return this.faculty.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.selectedDepartment || member.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  onSubmitFaculty(form: any) {
    if (form.valid) {
      console.log('New Faculty Data:', form.value);
      this.toggleAddForm();
      form.reset();
    }
  }
}
