import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Login } from "../../Layout/Public/login/login";
import { About } from "./about/about";
import { Admissions } from "./admissions/admissions";
import { Affiliated } from "./affiliated/affiliated";
import { Contact } from "./contact/contact";
import { Courses } from "./courses/courses";
import { Facilities } from "./facilities/facilities";
import { Faculty } from "./faculty/faculty";
import { FAQ } from "./faq/faq";
import { AdmissionForm } from "./forms/admission/admission";
import { CertificationForm } from "./forms/certification/certification";
import { ExaminationForm } from "./forms/examination/examination";
import { Gallary } from "./gallary/gallary";
import { Home } from "./home/home";
import { News } from "./news/news";
import { Placements } from "./placements/placements";
import { Scholarships } from "./scholarships/scholarships";
import { StudentLife } from "./student-life/student-life";
import { Teams } from "./teams/teams";
import { PublicGuard } from "../../../lab/routing-guards/public-guard";
import { StudentAdmissions } from "./student-home/student-admissions/student-admissions";
import { StudentExamination } from "./student-home/student-examination/student-examination";
import { TimeTable } from "./student-home/time-table/time-table";
import { Syllabus } from "./student-home/syllabus/syllabus";
import { EContent } from "./student-home/e-content/e-content";
import { RTI } from "./student-home/rti/rti";
import { HostelsMess } from "./student-home/hostels-mess/hostels-mess";
import { ICT } from "./student-home/ict/ict";
import { Results } from "./student-home/results/results";
import { AntiRagging } from "./facility-home/anti-ragging/anti-ragging";

const route: Routes = [
    {
        path: '',
        children: [
            { path: '', component: Home, canActivate: [PublicGuard] },
            { path: 'home', component: Home, canActivate: [PublicGuard] },
            { path: 'login', component: Login, canActivate: [PublicGuard] },
            { path: 'courses', component: Courses, canActivate: [PublicGuard] },
            { path: 'about', component: About, canActivate: [PublicGuard] },
            { path: 'admissions', component: Admissions, canActivate: [PublicGuard] },
            { path: 'faq', component: FAQ, canActivate: [PublicGuard] },
            { path: 'facilities', component: Facilities, canActivate: [PublicGuard] },
            { path: 'placements', component: Placements, canActivate: [PublicGuard] },
            { path: 'scholarships', component: Scholarships, canActivate: [PublicGuard] },
            { path: 'student-life', component: StudentLife, canActivate: [PublicGuard] },
            { path: 'affiliated', component: Affiliated, canActivate: [PublicGuard] },
            { path: 'contact', component: Contact, canActivate: [PublicGuard] },
            { path: 'TrainingPattern', component: Faculty, canActivate: [PublicGuard] },
            { path: 'OurAchievements', component: News, canActivate: [PublicGuard] },
            { path: 'gallary', component: Gallary, canActivate: [PublicGuard] },
            { path: 'teams', component: Teams, canActivate: [PublicGuard] },
            { path: 'news', component: News, canActivate: [PublicGuard] },
            { path: 'forms/admission', component: AdmissionForm },
            { path: 'forms/examination', component: ExaminationForm },
            { path: 'forms/certification', component: CertificationForm },
            // Student Home Routes
            { path: 'StudentHome/Admissions', component: StudentAdmissions, canActivate: [PublicGuard] },
            { path: 'StudentHome/Examination', component: StudentExamination, canActivate: [PublicGuard] },
            { path: 'StudentHome/TimeTable', component: TimeTable, canActivate: [PublicGuard] },
            { path: 'StudentHome/Syllabus', component: Syllabus, canActivate: [PublicGuard] },
            { path: 'StudentHome/EContent', component: EContent, canActivate: [PublicGuard] },
            { path: 'StudentHome/RTI', component: RTI, canActivate: [PublicGuard] },
            { path: 'StudentHome/Hostels_Mess', component: HostelsMess, canActivate: [PublicGuard] },
            { path: 'StudentHome/ICT', component: ICT, canActivate: [PublicGuard] },
            { path: 'StudentHome/Results', component: Results, canActivate: [PublicGuard] },
            // Facility Home Routes
            { path: 'FacilityHome/anti_ragging', component: AntiRagging, canActivate: [PublicGuard] },
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
export class PublicModule { }
