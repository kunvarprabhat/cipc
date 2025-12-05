import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApplicationUser {
  private TOKEN_KEY = 'User_Token';
  private REFRESH_TOKEN_KEY = 'refresh_Token';
  private ACCESS_TOKEN_KEY = 'access_Token';
  private USER_KEY = 'userInfo';

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
      // Generate a simple token for authentication
      const token = this.generateToken(email, loginType);
      
      // Store user info
      localStorage.setItem(this.USER_KEY, JSON.stringify({
        name: creds.name,
        role: creds.role,
        loginType,
        email: creds.email,
        token: token
      }));

      // Store token separately for easy access
      localStorage.setItem(this.TOKEN_KEY, token);

      return true;
    }
    return false;
  }

  private generateToken(email: string, loginType: string): string {
    // Generate a simple token (in production, this should come from backend)
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${email}:${loginType}:${timestamp}:${random}`);
  }

  getToken(): string | null {
    // First try to get token from TOKEN_KEY
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return token;
    }
    
    // Fallback: get token from userInfo
    const userInfo = localStorage.getItem(this.USER_KEY);
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        return user.token || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  getAuthStatus(): boolean {
    // Check if userInfo exists in localStorage
    return !!localStorage.getItem(this.USER_KEY);
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem(this.USER_KEY);
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  logout() {
    // Remove both userInfo and token
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }
}


