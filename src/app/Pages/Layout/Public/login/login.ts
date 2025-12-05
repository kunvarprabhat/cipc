import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../../../Services/shared-service/application-user';

type LoginType = 'student' | 'admin' | 'teacher' | 'affiliation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @Input() isOpen = false;
  @Input() loginType: LoginType = 'student';
  @Output() onClose = new EventEmitter<void>();

  email = '';
  password = '';
  rememberMe = false;
  isLoading = false;
  error = '';
  isLoggedIn = false;


  dummyCredentials: Record<LoginType, { email: string; password: string; name: string; role: string }> = {
    student: { email: 'student@cipc.edu', password: 'student123', name: 'Rahul Kumar', role: 'Student' },
    admin: { email: 'admin@cipc.edu', password: 'admin123', name: 'Dr. Priya Sharma', role: 'Administrator' },
    teacher: { email: 'teacher@cipc.edu', password: 'teacher123', name: 'Prof. Amit Singh', role: 'Faculty' },
    affiliation: { email: 'affiliation@cipc.edu', password: 'affiliate123', name: 'Regional Manager', role: 'Affiliation Partner' },
  };

  constructor(private router: Router,
    private _appuser: ApplicationUser,
  ) { }

  close() {
    this.onClose.emit();
  }

  fillDemoCredentials() {
    const creds = this.dummyCredentials[this.loginType];
    this.email = creds.email;
    this.password = creds.password;
  }

  async submitLogin() {
  this.isLoading = true;
  this.error = '';

  await new Promise(r => setTimeout(r, 1000)); // simulate loading

  if (this._appuser.login(this.email, this.password, this.loginType)) {
    this.isLoggedIn = true; // ✅ mark user as logged in
    this.isLoading = false;
    // Optionally navigate to dashboard automatically after a delay
    setTimeout(() => {
      this.close(); // close modal
      this.router.navigate(['/secure/dashboard']);
    }, 1000); // show success message for 1s
  } else {
    this.error = 'Invalid email or password. Please use demo credentials.';
    this.isLoading = false;
  }
}


  getLoginConfig() {
    switch (this.loginType) {
      case 'student':
        return { title: 'Student Login', subtitle: 'Access your student portal', gradient: 'from-green-600 to-green-700', buttonColor: 'bg-green-600 hover:bg-green-700' };
      case 'admin':
        return { title: 'Admin Login', subtitle: 'College management system', gradient: 'from-blue-600 to-blue-700', buttonColor: 'bg-blue-600 hover:bg-blue-700' };
      case 'teacher':
        return { title: 'Faculty Login', subtitle: 'Faculty portal access', gradient: 'from-purple-600 to-purple-700', buttonColor: 'bg-purple-600 hover:bg-purple-700' };
      case 'affiliation':
        return { title: 'Affiliation Login', subtitle: 'Partner institution portal', gradient: 'from-orange-600 to-orange-700', buttonColor: 'bg-orange-600 hover:bg-orange-700' };
    }
  }
}



