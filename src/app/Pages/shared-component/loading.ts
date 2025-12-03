import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { loadingservice } from '../../Services/shared-service/loading-service';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, AsyncPipe],  // Added AsyncPipe for observable binding
  template: `
    <div *ngIf="loading$ | async" class="loader-overlay">
      <div class="loader-spinner"></div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }

    .loader-spinner {
      width: 60px;
      height: 60px;
      border: 6px solid #f3f3f3;
      border-top: 6px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  loading$: Observable<boolean>;

  constructor(private loadingService: loadingservice) {
    this.loading$ = this.loadingService.loading$;
  }
}
