import { Component, signal, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PublicLayout } from "./Pages/Layout/Public/public-layout/public-layout";
import { DashboardLayout } from "./Pages/Layout/Secure/dashboard-layout/dashboard-layout";
import { ToastComponent } from './Components/toast/toast.component';
import { CommonModule } from '@angular/common';
import { filter, Subscription, interval } from 'rxjs';
import { ApplicationUser } from './Services/shared-service/application-user';
import { LoaderComponent } from "./Pages/shared-component/loading";


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [PublicLayout, DashboardLayout, ToastComponent, CommonModule, LoaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('cipc');
  isAuthenticated = false;
  private routerSubscription?: Subscription;
  private authCheckSubscription?: Subscription;

  constructor(
    private _appuser: ApplicationUser,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Check initial auth status immediately
    this.checkAuthStatus();
    
    // Listen to router events to update auth status on navigation
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Small delay to ensure localStorage is updated
        setTimeout(() => {
          this.checkAuthStatus();
        }, 100);
      });

    // Check auth status periodically to catch localStorage changes (reduced frequency)
    this.authCheckSubscription = interval(300).subscribe(() => {
      const newAuthStatus = this._appuser.getAuthStatus();
      if (newAuthStatus !== this.isAuthenticated) {
        this.checkAuthStatus();
      }
    });

    // Listen to storage events (for cross-tab auth changes)
    window.addEventListener('storage', () => {
      this.checkAuthStatus();
    });
  }

  checkAuthStatus() {
    const newAuthStatus = this._appuser.getAuthStatus();
    if (newAuthStatus !== this.isAuthenticated) {
      this.isAuthenticated = newAuthStatus;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    this.authCheckSubscription?.unsubscribe();
  }
}
