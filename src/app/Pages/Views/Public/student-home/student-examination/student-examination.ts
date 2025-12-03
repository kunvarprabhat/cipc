import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-examination',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-examination.html',
  styleUrls: ['./student-examination.css']
})
export class StudentExamination {
  
}

