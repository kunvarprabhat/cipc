import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplicationUser {
  private TOKEN_KEY = 'User_Token';
  private REFRESH_TOKEN_KEY = 'refresh_Token';
  private ACCESS_TOKEN_KEY = 'access_Token';
  private USER_KEY = 'user_key';

  login(email: string, password: string, loginType: string): boolean {
    // Check against dummy credentials
    const dummyCredentials: Record<string, { email: string; password: string; name: string; role: string }> = {
      student: { email: 'student@cipc.edu', password: 'student123', name: 'Rahul Kumar', role: 'Student' },
      admin: { email: 'admin@cipc.edu', password: 'admin123', name: 'Dr. Priya Sharma', role: 'Administrator' },
      teacher: { email: 'teacher@cipc.edu', password: 'teacher123', name: 'Prof. Amit Singh', role: 'Faculty' },
      affiliation: { email: 'affiliation@cipc.edu', password: 'affiliate123', name: 'Regional Manager', role: 'Affiliation Partner' },
    };

    const creds = dummyCredentials[loginType];
    if (creds && email === creds.email && password === creds.password) {
      localStorage.setItem('userInfo', JSON.stringify({
        name: creds.name,
        role: creds.role,
        loginType,
        email: creds.email
      }));

      return true;
    }
    return false;
  }
  getToken(): string | null {
    const userInfo = localStorage.getItem('TOKEN_KEY');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.token || null;
    }
    return null;
  }
  getAuthStatus(): boolean {
    return !!localStorage.getItem('TOKEN_KEY'); // ✅ check localStorage
  }

  logout() {
    localStorage.removeItem('TOKEN_KEY');
  }
}


