import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from '../../../Layout/Public/footer/footer';
import { Header } from '../../../Layout/Public/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-dashboard',
  imports: [CommonModule, Header, Footer],
  templateUrl: './public-dashboard.html',
  styleUrls: ['./public-dashboard.css']
})
export class PublicDashboard {

}
