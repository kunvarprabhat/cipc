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
            { path: 'forms/admission', component: AdmissionForm },
            { path: 'forms/examination', component: ExaminationForm },
            { path: 'forms/certification', component: CertificationForm },
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
