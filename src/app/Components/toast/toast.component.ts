import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from '../../Services/shared-service/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.updateToasts();
    // Update toasts whenever they change
    setInterval(() => {
      this.updateToasts();
    }, 100);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  updateToasts() {
    this.toasts = this.toastService.getToasts();
  }

  removeToast(id: string) {
    this.toastService.remove(id);
    this.updateToasts();
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return 'ri-checkbox-circle-fill';
      case 'error': return 'ri-error-warning-fill';
      case 'warning': return 'ri-alert-fill';
      case 'info': return 'ri-information-fill';
      default: return 'ri-information-fill';
    }
  }
}

