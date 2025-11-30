import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
contactForm: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.submitStatus = 'success';
      this.contactForm.reset();
    } catch (error) {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
}
