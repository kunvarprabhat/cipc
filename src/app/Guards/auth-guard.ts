import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../Services/auth-services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServices, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthStatus()) {
      return true; // User logged in → allow route
    } else {
      this.router.navigate(['/']); // Not logged in → redirect to home
      return false;
    }
  }
}

