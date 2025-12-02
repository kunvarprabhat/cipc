import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Attendance } from "./AttendanceManagement/attendance/attendance";
import { Course } from "./CourseManagement/course/course";
import { DashboardOverview } from "./DashboardOverview/dashboard-overview";
import { EventList } from "./EventManagement/event-list/event-list";
import { ExamList } from "./ExamManagement/exam-list/exam-list";
import { FacultyList } from "./FacultyManagement/faculty-list/faculty-list";
import { FeesList } from "./FeesManagement/fees-list/fees-list";
import { HostelList } from "./HostelManagement/hostel-list/hostel-list";
import { LearningList } from "./LearningManagement/learning-list/learning-list";
import { LeaveList } from "./LeaveManagement/leave-list/leave-list";
import { LibraryList } from "./LibraryManagement/library-list/library-list";
import { ResultList } from "./ResultManagement/result-list/result-list";
import { StudentList } from "./StudentManagement/student-list/student-list";
import { TransportList } from "./TransportManagement/transport-list/transport-list";

const route: Routes = [
    {
        path: '',
        // canActivate: [AuthGuard], 
        children: [
            { path: 'dashboard', component: DashboardOverview},
            { path: 'students', component: StudentList},
            { path: 'faculty', component: FacultyList},
            { path: 'courses/manage', component: Course},
            { path: 'attendance', component: Attendance},
            { path: 'leave', component: LeaveList},
            { path: 'exams', component: ExamList},
            { path: 'fees', component: FeesList},
            { path: 'library', component: LibraryList},
            { path: 'lms', component: LearningList},
            { path: 'hostel', component: HostelList},
            { path: 'transport', component: TransportList},
            { path: 'events', component: EventList},
            { path: 'results', component: ResultList},
            { path: '**', redirectTo: 'login' }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})
export class SecureModule { }