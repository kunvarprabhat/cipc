import { Routes } from '@angular/router';
import { Login } from './Pages/Layout/Public/login/login';
import { Courses } from './Pages/Views/Public/courses/courses';
import { About } from './Pages/Views/Public/about/about';
import { AuthGuard } from './Guards/auth-guard';
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

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  //{ path: 'dashboard', component: DashboardLayout, canActivate: [AuthGuard] },
  { path: 'courses', component: Courses },
  {path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'affiliated', component: Affiliated },
  { path: 'contact', component: Contact },
  { path: 'Training Pattern', component: Faculty },
  { path: 'Our Achievements', component: News },
  { path: 'Gallery', component: News },
  // Secure pages
  { path: 'dashboard', component: DashboardLayout, canActivate: [AuthGuard] },
  { path: 'students', component: StudentList },
  { path: 'faculty', component: FacultyList },
  { path: 'courses/manage', component: Course },
  { path: 'attendance', component: Attendance },
  { path: 'leave', component: LeaveList },
  { path: 'exams', component: ExamList },
  { path: 'fees', component: FeesList },
  { path: 'library', component: LibraryList },
  { path: 'lms', component: LearningList },
  { path: 'hostel', component: HostelList },
  { path: 'transport', component: TransportList },
  { path: 'events', component: EventList },
  { path: '**', redirectTo: 'login' } // wildcard always last
];


