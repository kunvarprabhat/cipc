import { Routes } from '@angular/router';
import { Login } from './Pages/Layout/Public/login/login';
import { Courses } from './Pages/Views/Public/courses/courses';
import { About } from './Pages/Views/Public/about/about';
import { AuthGuard } from './Guards/auth-guard';
import { PublicGuard } from './Guards/public-guard';
import { Affiliated } from './Pages/Views/Public/affiliated/affiliated';
import { Contact } from './Pages/Views/Public/contact/contact';
import { Faculty } from './Pages/Views/Public/faculty/faculty';
import { News } from './Pages/Views/Public/news/news';
import { DashboardLayout } from './Pages/Layout/Secure/dashboard-layout/dashboard-layout';
import { Home } from './Pages/Views/Public/home/home';
import { StudentList } from './Pages/Views/Secure/StudentManagement/student-list/student-list';
import { Attendance } from './Pages/Views/Secure/AttendanceManagement/attendance/attendance';
import { FacultyList } from './Pages/Views/Secure/FacultyManagement/faculty-list/faculty-list';
import { Course } from './Pages/Views/Secure/CourseManagement/course/course';
import { LeaveList } from './Pages/Views/Secure/LeaveManagement/leave-list/leave-list';
import { ExamList } from './Pages/Views/Secure/ExamManagement/exam-list/exam-list';
import { FeesList } from './Pages/Views/Secure/FeesManagement/fees-list/fees-list';
import { LibraryList } from './Pages/Views/Secure/LibraryManagement/library-list/library-list';
import { LearningList } from './Pages/Views/Secure/LearningManagement/learning-list/learning-list';
import { HostelList } from './Pages/Views/Secure/HostelManagement/hostel-list/hostel-list';
import { TransportList } from './Pages/Views/Secure/TransportManagement/transport-list/transport-list';
import { EventList } from './Pages/Views/Secure/EventManagement/event-list/event-list';
import { DashboardOverview } from './Pages/Views/Secure/DashboardOverview/dashboard-overview';
import { Gallary } from './Pages/Views/Public/gallary/gallary';
import { AdmissionForm } from './Pages/Views/Public/forms/admission/admission';
import { ExaminationForm } from './Pages/Views/Public/forms/examination/examination';
import { CertificationForm } from './Pages/Views/Public/forms/certification/certification';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [PublicGuard] },
  // Public routes - redirect to dashboard if logged in
  { path: 'courses', component: Courses, canActivate: [PublicGuard] },
  { path: 'home', component: Home, canActivate: [PublicGuard] },
  { path: 'about', component: About, canActivate: [PublicGuard] },
  { path: 'affiliated', component: Affiliated, canActivate: [PublicGuard] },
  { path: 'contact', component: Contact, canActivate: [PublicGuard] },
  { path: 'Training Pattern', component: Faculty, canActivate: [PublicGuard] },
  { path: 'Our Achievements', component: News, canActivate: [PublicGuard] },
  { path: 'gallary', component: Gallary, canActivate: [PublicGuard] },
  // Forms - accessible to all (no guard)
  { path: 'forms/admission', component: AdmissionForm },
  { path: 'forms/examination', component: ExaminationForm },
  { path: 'forms/certification', component: CertificationForm },
  // Secure pages - all require authentication
  // DashboardLayout is shown conditionally in app.html, so routes just need the page components
  { path: 'dashboard', component: DashboardOverview, canActivate: [AuthGuard] },
  { path: 'students', component: StudentList, canActivate: [AuthGuard] },
  { path: 'faculty', component: FacultyList, canActivate: [AuthGuard] },
  { path: 'courses/manage', component: Course, canActivate: [AuthGuard] },
  { path: 'attendance', component: Attendance, canActivate: [AuthGuard] },
  { path: 'leave', component: LeaveList, canActivate: [AuthGuard] },
  { path: 'exams', component: ExamList, canActivate: [AuthGuard] },
  { path: 'fees', component: FeesList, canActivate: [AuthGuard] },
  { path: 'library', component: LibraryList, canActivate: [AuthGuard] },
  { path: 'lms', component: LearningList, canActivate: [AuthGuard] },
  { path: 'hostel', component: HostelList, canActivate: [AuthGuard] },
  { path: 'transport', component: TransportList, canActivate: [AuthGuard] },
  { path: 'events', component: EventList, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } // wildcard always last
];


