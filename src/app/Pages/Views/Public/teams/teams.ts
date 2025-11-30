import { Component } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
}

@Component({
  standalone: true,
  selector: 'app-teams',
  imports: [CommonModule, NgForOf],
  templateUrl: './teams.html',
  styleUrls: ['./teams.css']
})
export class Teams {
  members: TeamMember[] = [
    { id: '1', name: 'Dr. Priya Sharma', role: 'Director & Principal', bio: 'Over 18 years leading paramedical education, research and student development.', photo: 'Assets/people/priya.jpg' },
    { id: '2', name: 'Prof. Amit Singh', role: 'Head of Faculty', bio: 'Expert in curriculum design and clinical training with strong industry links.', photo: 'Assets/people/amit.jpg' },
    { id: '3', name: 'Rahul Kumar', role: 'Student Affairs', bio: 'Oversees student support services, internships and placement coordination.', photo: 'Assets/people/rahul.jpg' },
    { id: '4', name: 'Ms. Neha Verma', role: 'Lab Supervisor', bio: 'Ensures laboratory safety, equipment maintenance and hands-on student training.', photo: 'Assets/people/neha.jpg' },
    { id: '5', name: 'Smt. Ritu Gupta', role: 'Admin Officer', bio: 'Manages administrative operations and campus logistics.', photo: 'Assets/people/ritu.jpg' },
    { id: '6', name: 'Mr. Vikram Patel', role: 'Placement Head', bio: 'Builds employer relationships and leads placement initiatives.', photo: 'Assets/people/vikram.jpg' },
    { id: '7', name: 'Ms. Sunita Rao', role: 'Admission Counselor', bio: 'Guides prospective students through admissions and course selection.', photo: 'Assets/people/sunita.jpg' },
    { id: '8', name: 'Mr. Suresh Yadav', role: 'Finance Officer', bio: 'Handles financial planning, scholarships and fee management.', photo: 'Assets/people/suresh.jpg' },
    { id: '9', name: 'Ms. Lata Reddy', role: 'Librarian', bio: 'Manages library resources, digital access and student research support.', photo: 'Assets/people/lata.jpg' },
    { id: '10', name: 'Dr. Karan Mehta', role: 'Exam Coordinator', bio: 'Coordinates examinations, evaluation and academic records.', photo: 'Assets/people/karan.jpg' },
    { id: '11', name: 'Mr. Arjun Das', role: 'Sports Coach', bio: 'Leads physical training, sports programs and student wellness activities.', photo: 'Assets/people/arjun.jpg' },
    { id: '12', name: 'Ms. Pooja Sharma', role: 'IT Support', bio: 'Maintains campus IT infrastructure and student learning platforms.', photo: 'Assets/people/pooja.jpg' },
    { id: '13', name: 'Mr. Rakesh Sharma', role: 'HR Manager', bio: 'Responsible for faculty recruitment, HR policies and staff welfare.', photo: 'Assets/people/rakesh.jpg' },
    { id: '14', name: 'Dr. Meera Nair', role: 'Quality Head', bio: 'Ensures compliance with ISO standards and academic quality benchmarks.', photo: 'Assets/people/meera.jpg' },
    { id: '15', name: 'Dr. Anil Joshi', role: 'Research Coordinator', bio: 'Promotes research activities and faculty-student research collaborations.', photo: 'Assets/people/anil.jpg' },
    { id: '16', name: 'Ms. Kavita Singh', role: 'Clinical Lead', bio: 'Oversees clinical partnerships and practical training placements.', photo: 'Assets/people/kavita.jpg' },
    { id: '17', name: 'Mr. Manoj Kumar', role: 'Nurse Trainer', bio: 'Conducts nurse training programs and clinical skill workshops.', photo: 'Assets/people/manoj.jpg' },
    { id: '18', name: 'Ms. Richa Patel', role: 'Workshop Manager', bio: 'Organizes workshops, guest lectures and industry events.', photo: 'Assets/people/richa.jpg' },
    { id: '19', name: 'Mr. Sunil Chauhan', role: 'Outreach Coordinator', bio: 'Leads community outreach, health camps and awareness programs.', photo: 'Assets/people/sunil.jpg' },
    { id: '20', name: 'Ms. Ananya Roy', role: 'Guest Relations', bio: 'Manages external relations, guest faculty coordination and partnerships.', photo: 'Assets/people/ananya.jpg' },

    { id: '21', name: 'Ms. Kavya Nair', role: 'Receptionist', bio: 'First point of contact for visitors and general enquiries.', photo: 'Assets/people/dummy.svg' },
    { id: '22', name: 'Mr. Ramesh Iyer', role: 'Security Supervisor', bio: 'Ensures campus and student safety with trained security staff.', photo: 'Assets/people/dummy.svg' },
    { id: '23', name: 'Ms. Geeta Menon', role: 'Housekeeping Head', bio: 'Maintains cleanliness and sanitation across campus facilities.', photo: 'Assets/people/dummy.svg' },
    { id: '24', name: 'Mr. Rohit Bansal', role: 'Transport Manager', bio: 'Manages college transport services and driver schedules.', photo: 'Assets/people/dummy.svg' },
    { id: '25', name: 'Ms. Shweta Joshi', role: 'Canteen Manager', bio: 'Oversees food services, hygiene and vendor coordination.', photo: 'Assets/people/dummy.svg' },
    { id: '26', name: 'Mr. Ajay Rana', role: 'Lab Technician', bio: 'Assists faculty in lab setups and equipment handling.', photo: 'Assets/people/dummy.svg' },
    { id: '27', name: 'Ms. Priyanka Desai', role: 'Clinical Instructor', bio: 'Provides hands-on clinical guidance during practical sessions.', photo: 'Assets/people/dummy.svg' },
    { id: '28', name: 'Mr. Vikash Chaurasia', role: 'Radiology Instructor', bio: 'Trains students in imaging techniques and safety protocols.', photo: 'Assets/people/dummy.svg' },
    { id: '29', name: 'Ms. Neelam Kaur', role: 'Records Clerk', bio: 'Maintains student records, certificates and documentation.', photo: 'Assets/people/dummy.svg' },
    { id: '30', name: 'Mr. Pradeep Sinha', role: 'Compliance Officer', bio: 'Oversees regulatory compliance and accreditation processes.', photo: 'Assets/people/dummy.svg' },

    { id: '31', name: 'Ms. Divya Kapoor', role: 'Data Entry Operator', bio: 'Manages data entry for administration and academic departments.', photo: 'Assets/people/dummy.svg' },
    { id: '32', name: 'Mr. Deepak Verma', role: 'Maintenance Engineer', bio: 'Handles facility maintenance and technical repairs.', photo: 'Assets/people/dummy.svg' },
    { id: '33', name: 'Mr. Sajan Thomas', role: 'Electrician', bio: 'Responsible for electrical maintenance and safety checks.', photo: 'Assets/people/dummy.svg' },
    { id: '34', name: 'Mr. Balwant Singh', role: 'Plumber', bio: 'Responsible for plumbing maintenance and repairs.', photo: 'Assets/people/dummy.svg' },
    { id: '35', name: 'Mr. Karan Gill', role: 'Driver', bio: 'Drives college vehicles and ensures safe student transport.', photo: 'Assets/people/dummy.svg' },
    { id: '36', name: 'Ms. Renu Patel', role: 'Hostel Warden', bio: 'Manages hostel operations, student welfare and safety.', photo: 'Assets/people/dummy.svg' },
    { id: '37', name: 'Mr. Naveen Rao', role: 'Hostel Caretaker', bio: 'Assists in day-to-day hostel management and upkeep.', photo: 'Assets/people/dummy.svg' },
    { id: '38', name: 'Ms. Anjali Bose', role: 'Counselor', bio: 'Provides student counseling and mental health support.', photo: 'Assets/people/dummy.svg' },
    { id: '39', name: 'Mr. Kunal Mehra', role: 'Career Counselor', bio: 'Advises students on career paths, internships and employability skills.', photo: 'Assets/people/dummy.svg' },
    { id: '40', name: 'Ms. Roshni Shah', role: 'Alumni Coordinator', bio: 'Maintains alumni relations and coordinates alumni events.', photo: 'Assets/people/dummy.svg' },

    { id: '41', name: 'Mr. Manoj Bhat', role: 'PR & Marketing', bio: 'Handles public relations, outreach and marketing activities.', photo: 'Assets/people/dummy.svg' },
    { id: '42', name: 'Ms. Shilpa Rao', role: 'Legal Advisor', bio: 'Provides legal guidance on institutional matters and contracts.', photo: 'Assets/people/dummy.svg' },
    { id: '43', name: 'Mr. Ajinkya Deshmukh', role: 'Procurement Officer', bio: 'Manages procurement of equipment and supplies.', photo: 'Assets/people/dummy.svg' },
    { id: '44', name: 'Ms. Reema K', role: 'Procurement Assistant', bio: 'Supports procurement and vendor coordination.', photo: 'Assets/people/dummy.svg' },
    { id: '45', name: 'Mr. Sameer Khan', role: 'Workshop Technician', bio: 'Supports practical workshops and equipment maintenance.', photo: 'Assets/people/dummy.svg' },
    { id: '46', name: 'Ms. Priti Nair', role: 'Quality Auditor', bio: 'Conducts periodic audits to maintain academic and operational standards.', photo: 'Assets/people/dummy.svg' },
    { id: '47', name: 'Mr. Adil Sheikh', role: 'E-Library Manager', bio: 'Manages digital library systems and access.', photo: 'Assets/people/dummy.svg' },
    { id: '48', name: 'Ms. Karuna Sen', role: 'Exam Assistant', bio: 'Assists with exam logistics and invigilation.', photo: 'Assets/people/dummy.svg' },
    { id: '49', name: 'Mr. Rohit Kumar', role: 'Scheduling Officer', bio: 'Prepares class timetables and coordinates room allocations.', photo: 'Assets/people/dummy.svg' },
    { id: '50', name: 'Ms. Nisha Gupta', role: 'Research Assistant', bio: 'Supports faculty research projects and publications.', photo: 'Assets/people/dummy.svg' }
  ];

  // Pagination state
  pageSize = 12;
  currentPage = 1;

  get totalPages() {
    return Math.max(1, Math.ceil(this.members.length / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedMembers() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.members.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1;
  }
}
