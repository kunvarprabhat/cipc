import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../Services/auth-services';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthServices, private router: Router) {}

  canActivate(): boolean {
    // If user is logged in, redirect to dashboard
    if (this.authService.getAuthStatus()) {
      this.router.navigate(['/dashboard']);
      return false; // Prevent access to public route
    }
    return true; // Allow access to public route if not logged in
  }
}

