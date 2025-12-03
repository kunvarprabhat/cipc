import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hostels-mess',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hostels-mess.html',
  styleUrls: ['./hostels-mess.css']
})
export class HostelsMess {
  
}

