import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./Pages/Layout/Public/footer/footer";
import { Header } from './Pages/Layout/Public/header/header';
import { PublicLayout } from "./Pages/Layout/Public/public-layout/public-layout";

@Component({
  selector: 'app-root',
  imports: [ PublicLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cipc');
}
