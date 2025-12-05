import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApplicationUser } from '../../Services/shared-service/application-user';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private _appuser: ApplicationUser, private router: Router) {}

  canActivate(): boolean {
    // If user is logged in, redirect to dashboard
    if (this._appuser.getAuthStatus()) {
      this.router.navigate(['/secure/dashboard']);
      return false; // Prevent access to public route
    }
    return true; // Allow access to public route if not logged in
  }
}

