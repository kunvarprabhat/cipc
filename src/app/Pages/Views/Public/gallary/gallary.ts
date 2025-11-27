import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallary',
  imports: [CommonModule],
  templateUrl: './gallary.html',
  styleUrl: './gallary.css'
})

export class Gallary implements OnInit {
  // Define the structure for an image object
  images: { url: string, alt: string }[] = [
    { url: 'Assets/images/a.jpeg', alt: 'Abstract Photo 1' },
    { url: 'assets/images/b.jpeg', alt: 'Abstract Photo 2' },
    { url: 'Assets/images/c.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/d.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/e.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/f.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/g.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/h.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/i.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/j.jpeg', alt: 'Abstract Photo 3' },
    { url: 'Assets/images/k.jpeg', alt: 'Abstract Photo 3' },
    {url:'src/app/Assets/images/g.jpeg',alt:'Abstract Photo 4'}
    // Add more images here
  ];


  // Lightbox Controls
  lightboxOpen = false;
  currentIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}