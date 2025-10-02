import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthServices {
  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    // Dummy login credentials
    if (email === 'Dummy1234@gmail.com' && password === 'Password123') {
      this.isAuthenticated = true;
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
  logout() {
    this.isAuthenticated = false;
  }
}

