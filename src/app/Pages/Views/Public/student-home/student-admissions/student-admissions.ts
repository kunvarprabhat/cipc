import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-admissions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-admissions.html',
  styleUrls: ['./student-admissions.css']
})
export class StudentAdmissions {
  
}

