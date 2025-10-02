import { Routes } from '@angular/router';
import { Login } from './Pages/Layout/Public/login/login';
import { DashBoard } from './Pages/Views/Secure/dash-board/dash-board';
import { Courses } from './Pages/Views/Public/courses/courses';
import { About } from './Pages/Views/Public/about/about';
import { AuthGuard } from './Guards/auth-guard';
import { Affiliated } from './Pages/Views/Public/affiliated/affiliated';
import { Contact } from './Pages/Views/Public/contact/contact';
import { Faculty } from './Pages/Views/Public/faculty/faculty';
import { News } from './Pages/Views/Public/news/news';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: DashBoard, canActivate: [AuthGuard] },
  { path: 'courses', component: Courses },
  { path: 'about', component: About },
  { path: 'affiliated', component: Affiliated },
  { path: 'contact', component: Contact },
  { path: 'Training Pattern', component: Faculty },
  { path: 'Our Achievements', component: News },
  { path: 'Gallery', component: News },
  { path: '**', redirectTo: 'login' } // wildcard always last
];
