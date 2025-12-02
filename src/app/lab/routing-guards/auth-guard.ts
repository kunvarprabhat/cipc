import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApplicationUser } from '../../Services/shared-service/application-user';


@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private _appuser: ApplicationUser, private router: Router) {}

  canActivate(): boolean {
    if (this._appuser.getAuthStatus()) {
      return true; // User logged in → allow route
    } else {
      this.router.navigate(['/']); // Not logged in → redirect to home
      return false;
    }
  }
}

